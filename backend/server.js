const express = require('express');
const cors = require('cors');
var mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());
           // mongodb://localhost:27017
const uri = process.env.URI;
mongoose.connect(uri);


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const usersRouter = require('./routes/users');
// app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});