const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const logger = require("morgan")
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");


connectDB();

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/events", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
