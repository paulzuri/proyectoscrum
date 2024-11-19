from flask import Flask, jsonify, request, render_template
from routes.products import products_bp  # Importa el Blueprint

app = Flask(__name__)

#Blueprint de productos
app.register_blueprint(products_bp)

@app.route('/')
def home():
    return "Welcome to the Flask Backend!"

@app.route('/api', methods=['GET'])
def api_example():
    return jsonify({"message": "Hello, World!"})

@app.route('/hello/<name>')
def hello(name):
    return render_template('index.html', name=name)

if __name__ == '__main__':
    app.run(debug=True)
