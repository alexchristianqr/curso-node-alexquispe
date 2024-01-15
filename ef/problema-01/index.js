import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import { todoRoute } from "./src/todo/todo.route.js";
import { userRoute } from "./src/user/user.route.js";
import { authRoute } from "./src/auth/auth.route.js";

config();
const app = express();
const whiteList = "*";
const corsOptions = {
  origin: whiteList,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use("/api/v1/", [todoRoute, userRoute, authRoute]);

app.get("/", (req, res) => {
  res.send("<h2>Welcome to API TODO</h2> <div>by <a href='https://github.com/alexchristianqr'>Alex Christian</a></div>.");
});

console.log("Connecting...");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB >>> :)");
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error(error);
    console.log("Error not connected >>> :(");
  });
