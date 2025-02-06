const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
require('dotenv').config();

const app = express();
const port = 3010;

app.use(cors({ origin: '*', credentials: true })); // Enable CORS
app.use(express.json()); // Allow JSON requests
app.use(express.urlencoded({ extended: true })); // Allow form-urlencoded requests

app.use(express.static('static'));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, './index.html'));
});

app.post('/api/users', (req, res) => {
  const { name, age, password } = req.body;

  if (!name || !age || !password) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  res.json({ message: 'User created successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
