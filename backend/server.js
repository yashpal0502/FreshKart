import "dotenv/config.js";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import addressRouter from "./routes/addressRoutes.js";

// inngest
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import adminRouter from "./routes/adminRoutes.js";
import deliveryPartnerRouter from "./routes/deliveryPartnerRoutes.js";

const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// api endpoints

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/orders", orderRouter);
// inngest endpoint
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/addresses", addressRouter);
app.use("/api/admin", adminRouter);
app.use("/api/delivery", deliveryPartnerRouter);

// Connecting mongoDb
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
