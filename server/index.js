require("dotenv").config();
const express = require("express");
const routes = require("./routes/route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const MongoString = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(MongoString);
const Database = mongoose.connection;

Database.on("error", () => {
  console.log("Your Server Not Connected With mongoDB");
});

Database.once("connected", () => {
  console.log("Your Server is Connected with mongoDB");
});

// All endpoints
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(routes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
