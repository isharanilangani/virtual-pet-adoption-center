const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
