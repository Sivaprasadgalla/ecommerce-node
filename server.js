const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

connectDB();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/ContactRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/products", require("./routes/ProductRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server runnig on port ${port}`);
})