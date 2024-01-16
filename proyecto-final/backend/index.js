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
const cnn = mongoose.connection;
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

console.log("Connecting to database...");

// Crear conexión
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error(error);
    console.log("Error not connected >>> :(");
  });

// Escuchar conexión
cnn.on("error", function (error) {
  console.log("[MongoDB]", `connection ${this.name} ${JSON.stringify(error)}`);
  cnn.close().catch(() => console.log("[MongoDB]", `failed to close connection ${this.name}`));
});
cnn.on("connected", function () {
  mongoose.set("debug", function (col, method, query, doc) {
    console.log("[MongoDB]", {
      db: this.conn.name,
      query: `${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`,
    });
  });
  console.log("[MongoDB]", `connected to ${this.name}`);
});
cnn.on("disconnected", function () {
  console.log("[MongoDB]", `disconnected of ${this.name}`);
});
