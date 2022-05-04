require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// import routes
const userRoutes = require('./routes/user');

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreatedIndex: true,
  })
  .then(() => console.log('DB Connection established'));

// routes
app.use('/api/v1', userRoutes);

// listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});


