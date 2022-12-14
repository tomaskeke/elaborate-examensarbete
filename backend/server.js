const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const logger = require("morgan")
const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const cors = require("cors");


connectDB();

const app = express();
// middlewares
app.use(logger('dev'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);


// routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/events", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));


app.listen(port, () => console.log(`Server started on port ${port}`));
