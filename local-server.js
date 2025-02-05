const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// In-memory data storage
let sensorData = [];

// POST route to receive sensor data
app.post('/api/data', (req, res) => {
  console.log('Received headers:', req.headers);
  console.log('Received body:', req.body);

  const { FeedTank, ProductTank, CIPTank, TDS } = req.body;

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
  res
    .status(200)
    .json({ message: 'Data received successfully!', data: newData });
});

// GET route to fetch all sensor data
app.get('/api/data', (req, res) => {
  res.status(200).json({ message: 'Sensor Data', data: sensorData });
});

// Start server locally
app.listen(port, () => {
  console.log(`Local server running at http://localhost:${port}`);
});
