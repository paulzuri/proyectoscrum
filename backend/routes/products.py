from flask import Blueprint, jsonify, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
# Crear el Blueprint para las rutas de productos
products_bp = Blueprint('products', __name__)

uri = "mongodb+srv://marlonzurita:E4FWgw0NXhwrPWgJ@cluster0.gvblu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Access the database and collection
db = client['products']  # Replace with your database name
products_collection = db['catalog']  # Replace with your collection name

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Base de datos DE PRUEBA
products = [
    {"id": 1, "name": "Laptop", "price": 1200.0},
    {"id": 2, "name": "Mouse", "price": 25.0},
]

# Ruta para obtener todos los productos (Read)
@products_bp.route('/products', methods=['GET'])
def get_products():
    products = list(products_collection.find({}, {'_id': 0}))  # Retrieve all products, exclude '_id'
    return jsonify(products)

# Ruta para obtener un producto por ID (Read)
@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = products_collection.find_one({"id": product_id}, {'_id': 0})
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

# Ruta para agregar un nuevo producto (Create)
@products_bp.route('/products', methods=['POST'])
def create_product():
    data = request.json
    if not data or not "name" in data or not "price" in data:
        return jsonify({"error": "Invalid data"}), 400

    # Generate a new unique ID
    last_product = products_collection.find_one(sort=[("id", -1)])
    new_id = last_product["id"] + 1 if last_product else 1

    new_product = {
        "id": new_id,
        "name": data["name"],
        "price": data["price"],
    }

    products_collection.insert_one(new_product)
    return jsonify(new_product), 201

# Update
@products_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.json
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    updated_product = products_collection.find_one_and_update(
        {"id": product_id},
        {"$set": data},
        return_document=True
    )

    if updated_product:
        return jsonify(updated_product), 200
    return jsonify({"error": "Product not found"}), 404

# Delete
@products_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    result = products_collection.delete_one({"id": product_id})
    if result.deleted_count > 0:
        return jsonify({"message": "Product deleted"}), 200
    return jsonify({"error": "Product not found"}), 404