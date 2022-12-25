require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || "127.0.0.1",
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  VAT_PERCENTAGE: process.env.VAT_PERCENTAGE || 10,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
