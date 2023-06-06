const express = require("express");

const cors = require("cors");

const repairRouter = require("./routes/repair.routes");

const userRouter = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/repair", repairRouter);

app.use("/api/v1/user", userRouter);

module.exports = app;
