import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import { todoRoute } from "./src/todo/todo.route.js";

config();
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/v1/", [todoRoute]);

app.get("/", (req, res) => {
  res.send("<h2>Welcome to API TODO</h2> <div>by <a href='https://github.com/alexchristianqr'>Alex Christian</a></div>.");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
