const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");

// Load env vars

dotenv.config({ path: "./config/config.env" });

connectDB();

// Route files
const messages = require("./routes/contact");

const app = express();

// Body Parser
app.use(express.json());

app.use(cors());

// Cookie parser

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers

app.use("/api/v1/messages", messages);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
