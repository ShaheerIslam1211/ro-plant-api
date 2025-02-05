const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());

// Custom middleware to handle JSON parsing errors
app.use((req, res, next) => {
  bodyParser.json()(req, res, (err) => {
    if (err) {
      console.error('Invalid JSON received:', err.message);
      return res.status(400).json({ message: 'Invalid JSON payload!' });
    }
    next();
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data storage
let sensorData = [];

// POST route to receive sensor data
app.post('/api/data', (req, res) => {
  const { FeedTank, ProductTank, CIPTank, TDS } = req.body;

  // Check if all required fields are present
  if (!FeedTank || !ProductTank || !CIPTank || !TDS) {
    return res.status(400).json({ message: 'Invalid data! Missing fields.' });
  }

  const newData = {
    FeedTank,
    ProductTank,
    CIPTank,
    TDS,
    timestamp: new Date().toISOString(),
  };

  sensorData.push(newData);
  console.log('Received Data:', newData);

  res
    .status(200)
    .json({ message: 'Data received successfully!', data: newData });
});

// GET route to fetch all sensor data
app.get('/api/data', (req, res) => {
  res.status(200).json({ message: 'Sensor Data', data: sensorData });
});

// Start server and bind to all interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
