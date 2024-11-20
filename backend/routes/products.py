from flask import Blueprint, jsonify, request

# Crear el Blueprint para las rutas de productos
products_bp = Blueprint('products', __name__)

# Base de datos DE PRUEBA
products = [
    {"id": 1, "name": "Laptop", "price": 1200.0},
    {"id": 2, "name": "Mouse", "price": 25.0},
]

# Ruta para obtener todos los productos (Read)
@products_bp.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

# Ruta para obtener un producto por ID (Read)
@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

# Ruta para agregar un nuevo producto (Create)
@products_bp.route('/products', methods=['POST'])
def create_product():
    data = request.json
    if not data or not "name" in data or not "price" in data:
        return jsonify({"error": "Invalid data"}), 400

    # Crear un nuevo producto con un ID único
    new_product = {
        "id": products[-1]["id"] + 1 if products else 1,
        "name": data["name"],
        "price": data["price"],
    }
    products.append(new_product)
    return jsonify(new_product), 201

# Update
@products_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        updated_data = request.get_json()
        product.update(updated_data)
        return jsonify(product), 200
    return jsonify({"error": "Product not found"}), 404

# Delete
@products_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    global products
    products = [p for p in products if p["id"] != product_id]
    return jsonify({"message": "Product deleted"}), 200

