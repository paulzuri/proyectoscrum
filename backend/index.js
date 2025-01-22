const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

require("dotenv").config();
const {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} = require("@paypal/paypal-server-sdk");

const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://book-app-frontend-tau.vercel.app'],
  credentials: true
}));

// Database Connection
async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Mongodb connected successfully!");
}
main().catch(err => console.error(err));

// Bookstore Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");
const productRoutes = require('./src/products/product.route');

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);



// PayPal Integration
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

const ordersController = new OrdersController(client);

const createOrder = async (data) => {
  const collect = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: data.product.cost,
          },
        },
      ],
    },
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCreate(collect);
    const parsedBody = JSON.parse(body); // Parseamos el cuerpo de la respuesta
    console.log("Respuesta de PayPal:", parsedBody); // Log de la respuesta de PayPal
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
  }
};

const captureOrder = async (orderID) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCapture(collect);
    return { jsonResponse: JSON.parse(body), httpStatusCode: httpResponse.statusCode };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
  }
};

app.post("/api/paypal/orders", async (req, res) => {
  try {
    const order = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(order);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/paypal/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

// Default Route
app.use("/", (req, res) => {
  res.send("Unified Server is running!");
});

// Server Listener
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});
