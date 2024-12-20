from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from routes import all_blueprints
from extensions import oauth
import os

# Cargar variables de entorno
load_dotenv()
# Verificar si las variables se cargaron
print(os.getenv("AUTH0_DOMAIN"))  # Esto debería imprimir tu dominio de Auth0

# Crear la aplicación Flask
app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("SECRET_KEY", "supersecretkey")

# Inicializar OAuth
oauth.init_app(app)
oauth.register(
    "auth0",
    client_id=os.getenv("AUTH0_CLIENT_ID"),
    client_secret=os.getenv("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{os.getenv("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)

# Registrar todos los blueprints
for bp in all_blueprints:
    app.register_blueprint(bp)

@app.route('/')
def home():
    return "<h1>Welcome to the Flask Backend!</h1>"

@app.route('/api', methods=['GET'])
def api_example():
    return jsonify({"message": "Hello, World!"})

@app.route('/hello/<name>')
def hello(name):
    return render_template('index.html', name=name)

@app.route('/greet/<name>')
def greet(name):
    return f"Hello {name}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
