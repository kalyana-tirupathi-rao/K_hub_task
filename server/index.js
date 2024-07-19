const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const noteRoutes = require('./noteRoutes');

const app = express();

app.use(express.json());
app.use(cors());

const DB = 'mongodb://0.0.0.0:27017/notebook';
mongoose.connect(DB)
  .then(() => {
    console.log('Database connected..');
  })
  .catch((err) => {
    console.log('Error connecting to database:', err);
  });

app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
