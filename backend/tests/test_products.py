import pytest
from routes.products import products_bp # Importa el Blueprint
from flask import Flask

# Configuración de la aplicación para pruebas
@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(products_bp)

    with app.test_client() as client:
        yield client

#Datos de PRUEBA
@pytest.fixture(autouse=True)
def reset_products():
    global products
    products = [
        {"id": 1, "name": "Laptop", "price": 1200.0},
        {"id": 2, "name": "Mouse", "price": 25.0},
    ]


# Pruebas para CRUD

# CREATE
def test_create_product(client):
    response = client.post('/products', json={"name": "Teclado", "price": 50.0})
    assert response.status_code == 201
    data = response.get_json()
    assert data["name"] == "Teclado"
    assert data["price"] == 50.0

# READ ALL
def test_get_products(client):
    response = client.get('/products')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)

# READ ONE
def test_get_product(client):
    response = client.get('/products/1')  # Asume que el ID 1 existe
    assert response.status_code == 200
    data = response.get_json()
    assert data["id"] == 1
    assert "name" in data

# UPDATE
def test_update_product(client):
    response = client.put('/products/1', json={"name": "Laptop Pro", "price": 1500.0})
    assert response.status_code == 200
    data = response.get_json()
    assert data["name"] == "Laptop Pro"
    assert data["price"] == 1500.0

# DELETE
def test_delete_product(client):
    response = client.delete('/products/1')
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "Product deleted"

    # Verifica que ya no esté en la lista
    response = client.get('/products/1')
    assert response.status_code == 404

# Prueba: Crear producto con datos inválidos
def test_create_product_invalid_data(client):
    # Sin datos
    response = client.post('/products', json={})
    assert response.status_code == 400
    assert "error" in response.get_json()

    # Sin campo "price"
    response = client.post('/products', json={"name": "Teclado"})
    assert response.status_code == 400
    assert "error" in response.get_json()

# Prueba: Obtener un producto que no existe
def test_get_nonexistent_product(client):
    response = client.get('/products/999')  # Asume que el ID 999 no existe
    assert response.status_code == 404
    assert "error" in response.get_json()

#REVISAR ESTA PRUEBA UNITARIA SOBRE UPDATE

# Prueba: Actualizar un producto con datos incompletos
def test_update_product_invalid_data(client):
    # Sin campo "name"
    response = client.put('/products/1', json={"price": 1500.0})
    assert response.status_code == 200  # La actualización parcial debería ser válida
    data = response.get_json()
    assert data["price"] == 1500.0

# Prueba: Actualizar un producto que no existe
def test_update_nonexistent_product(client):
    response = client.put('/products/999', json={"name": "Nonexistent"})
    assert response.status_code == 404
    assert "error" in response.get_json()

# Prueba: Eliminar un producto que no existe
def test_delete_nonexistent_product(client):
    response = client.delete('/products/999')  # Asume que el ID 999 no existe
    assert response.status_code == 200  # La API podría devolver éxito aunque no encuentre el producto
    assert response.get_json()["message"] == "Product deleted"

