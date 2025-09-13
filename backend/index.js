const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./server.js");
const rootRouter = require("./routes/index.js");

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

module.exports = app;
