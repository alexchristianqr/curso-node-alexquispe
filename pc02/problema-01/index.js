import { config } from "dotenv";
config();

import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>App express deployed successfully</h2> <div>by <a href='https://github.com/alexchristianqr'>Alex Christian</a></div>.");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
