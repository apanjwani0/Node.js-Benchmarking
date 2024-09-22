require('dotenv').config();

const express = require("express");
const connectDB = require("./utils/mongoClient");
const datasetRoutes = require("./module/dataset.route");

const app = express();
const PORT = process.env.PORT || 3000;

const clientOptions = {
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
};

app.use(express.json());
app.use("/api", datasetRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB(process.env.MONGO_URI, clientOptions);
});

app.use("", (req, res, next, err) => {
  console.error("Error Handler", err);
})