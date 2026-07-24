import "dotenv/config.js";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
