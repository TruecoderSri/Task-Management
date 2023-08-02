const express = require("express");
const cors = require("cors");
const app = express();

const tasksRouter = require("./routes/TaskFeatures");

const db = require("./db");

app.use(express.json());
app.use(
  cors({
    origin: ["https://task-management-sys.vercel.app"],
    method: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
// root endpoint

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Server Working" + port);
});

// tasks route

app.use("/api", tasksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
