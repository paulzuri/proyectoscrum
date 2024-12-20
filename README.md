# Frizi: Tienda en Línea Colaborativa

Bienvenido a **Frizi**, un proyecto colaborativo para crear una tienda en línea moderna y eficiente. Este README describe cómo contribuir al proyecto, instalar las dependencias, y utilizar las funcionalidades principales.

---

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Características Principales](#características-principales)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Requisitos Previos](#requisitos-previos)
5. [Instalación](#instalación)
6. [Ejecución](#ejecución)
7. [Contribuir](#contribuir)
8. [Licencia](#licencia)

---

## Descripción del Proyecto

Frizi es una tienda en línea diseñada para ofrecer una experiencia de compra sencilla y amigable tanto para los usuarios como para los administradores. Este proyecto tiene como objetivo ser flexible y escalable, permitiendo a los desarrolladores colaborar fácilmente en su desarrollo.

---

## Características Principales

- Catálogo de productos dinámico.
- Funcionalidad de carrito de compras.
- Sistema de usuarios con autenticación y roles (cliente/administrador).
- Pasarela de pagos segura.
- Panel de administración para gestionar productos, usuarios y pedidos.
- Diseño responsive para dispositivos móviles y de escritorio.

---

## Tecnologías Utilizadas

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Base de Datos:** MongoDB
- **Autenticación:** JWT (JSON Web Tokens)
- **Control de Versiones:** Git
- **Gestión del Proyecto:** GitHub Issues y Pull Requests

---

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

---

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu_usuario/frizi.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd frizi
   ```

3. Instala las dependencias del backend:

   ```bash
   cd backend
   npm install
   ```

4. Instala las dependencias del frontend:

   ```bash
   cd ../frontend
   npm install
   ```

---

## Ejecución

### Backend

1. Configura las variables de entorno creando un archivo `.env` en la carpeta `backend` con el siguiente contenido:

   ```env
   PORT=5000
   MONGO_URI=tu_uri_de_mongodb
   JWT_SECRET=tu_secreto_jwt
   ```

2. Inicia el servidor:

   ```bash
   npm start
   ```

### Frontend

1. Inicia la aplicación:

   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`.

---

## Contribuir

¡Contribuciones son bienvenidas! Sigue estos pasos para colaborar:

1. Realiza un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección:

   ```bash
   git checkout -b nombre-de-tu-rama
   ```

3. Realiza tus cambios y haz un commit:

   ```bash
   git commit -m "Descripción de tus cambios"
   ```

4. Sube los cambios a tu rama:

   ```bash
   git push origin nombre-de-tu-rama
   ```

5. Crea un Pull Request en GitHub y describe tus cambios detalladamente.

---

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
