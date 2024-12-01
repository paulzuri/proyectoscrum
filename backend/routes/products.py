from flask import Blueprint, jsonify, request, send_from_directory
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

# Ruta para obtener todos los productos (Read)
@products_bp.route('/products', methods=['GET'])
def get_products():
    products = []
    for product in products_collection.find({}, {'_id': 0}):  # Exclude MongoDB's internal _id
        # Print the entire product document to see its structure
        print("Product document:", product)
        
        # Create a default or fallback image filename
        image_filename = product.get('image_filename', 'default.jpg')
        
        # Transform data to match the frontend's requirements
        products.append({
            "name": product['nomb_producto'],
            "price": float(product['precio'].replace(',', '.')),
            "image_url": f"http://localhost:5555/images/{image_filename}"
        })
    return jsonify(products)

@products_bp.route('/images/<filename>')
def get_image(filename):
    return send_from_directory('../images', filename)

# Ruta para obtener un producto por ID (Read)
@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    # Use find_one with projection to exclude _id
    product = products_collection.find_one({"id": product_id}, {'_id': 0})
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

# Ruta para agregar un nuevo producto (Create)
@products_bp.route('/products', methods=['POST'])
def create_product():
    data = request.json
    
    # Print the incoming data for debugging
    print("Received data:", data)
    
    # Check for required fields specific to your schema
    required_fields = ['nomb_producto', 'precio', 'categoria', 'stock']
    
    # Validate that all required fields are present
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Generate a new unique ID (if needed)
    last_product = products_collection.find_one(sort=[("id", -1)])
    new_id = last_product.get("id", 0) + 1 if last_product else 1
    
    # Prepare the new product document
    new_product = {
        "nomb_producto": data["nomb_producto"],
        "precio": data["precio"],
        "categoria": data["categoria"],
        "stock": data["stock"],
        "image_filename": data.get("image_filename", "default.jpg"),
        "id": new_id,
    }
    
    # Insert the new product
    result = products_collection.insert_one(new_product)
    
    return jsonify({
        "message": "Product created successfully",
        "id": new_id
    }), 201

# Update
@products_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.json
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    # Validate input data before updating
    update_fields = {}
    allowed_fields = ['nomb_producto', 'precio', 'categoria', 'stock', 'image_filename']
    
    for field in allowed_fields:
        if field in data:
            update_fields[field] = data[field]

    if not update_fields:
        return jsonify({"error": "No valid fields to update"}), 400

    # Update and return the updated product
    updated_product = products_collection.find_one_and_update(
        {"id": product_id},
        {"$set": update_fields},
        return_document=True,
        projection={'_id': 0}  # Exclude MongoDB's internal _id
    )

    if updated_product:
        return jsonify(updated_product), 200
    return jsonify({"error": "Product not found"}), 404

# Delete
@products_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    # First, check if the product exists
    existing_product = products_collection.find_one({"id": product_id})
    if not existing_product:
        return jsonify({"error": "Product not found"}), 404

    # Then delete
    result = products_collection.delete_one({"id": product_id})
    
    return jsonify({
        "message": "Product deleted successfully", 
        "deleted_count": result.deleted_count
    }), 200