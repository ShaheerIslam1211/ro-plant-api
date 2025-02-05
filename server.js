const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());

// ✅ Parse incoming JSON requests properly
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ✅ Store sensor data in memory (For production, use a database)
let sensorData = [];

// ✅ Debugging - Log Incoming Requests for Any Device
app.use((req, res, next) => {
  console.log(`🟢 [LOG] ${req.method} request to ${req.url}`);
  console.log(`🔹 Headers:`, req.headers);
  console.log(`🔹 Body:`, req.body);
  next();
});

// ✅ POST: Universal API to Store Sensor Data
app.post('/api/data', (req, res) => {
  console.log(`🟢 [LOG] Processing POST request to /api/data`);

  try {
    if (!req.body || typeof req.body !== 'object') {
      console.log(`❌ [ERROR] Invalid JSON received`);
      return res.status(400).json({ message: 'Invalid JSON format!' });
    }

    const { FeedTank, ProductTank, CIPTank, TDS } = req.body;

    if (!FeedTank || !ProductTank || !CIPTank || !TDS) {
      console.log(`❌ [ERROR] Missing fields in request body!`);
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

    console.log(`✅ [SUCCESS] Data stored successfully!`, newData);

    return res.status(200).json({
      message: 'Data received successfully!',
      data: newData,
    });
  } catch (error) {
    console.error(`❌ [ERROR] Server Error:`, error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ GET: Retrieve Stored Sensor Data
app.get('/api/data', (req, res) => {
  console.log(`🟢 [LOG] Processing GET request to /api/data`);

  return res.status(200).json({
    message: 'Sensor Data',
    data: sensorData,
  });
});

// ✅ Start Express Locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () =>
    console.log('✅ Server running on http://localhost:3000')
  );
}

// ✅ Export for Vercel
module.exports = serverless(app);
