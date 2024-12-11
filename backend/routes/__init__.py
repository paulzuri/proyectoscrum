from flask import Blueprint
from .products import products_bp
from .auth import auth_bp

# Lista de todos los blueprints
all_blueprints = [
    products_bp,
    auth_bp
]
