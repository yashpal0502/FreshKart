import "dotenv/config.js";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// inngest
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

// Connecting mongoDb
async function main() {
  await connectDB();
}
main();

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

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
