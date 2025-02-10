const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Enable CORS for Next.js, Arduino, and Mobile
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ✅ Store sensor data (Use a database for production)
let sensorData = [];

// ✅ POST: Receive Data from Arduino
app.post("/api/data", (req, res) => {
  console.log(`🟢 [LOG] Processing POST request to /api/data`);
  console.log(`📩 Headers:`, req.headers);
  console.log(`📩 Body:`, req.body);

  try {
    if (!req.body || typeof req.body !== "object") {
      console.log(`❌ [ERROR] Invalid JSON received`);
      return res.status(400).json({ message: "Invalid JSON format!" });
    }

    // ✅ Store received data dynamically (accept any JSON fields)
    const receivedData = { ...req.body, timestamp: new Date().toISOString() };

    sensorData.push(receivedData);

    console.log(`✅ [SUCCESS] Data stored successfully!`, receivedData);

    return res.status(200).json({
      message: "Data received successfully!",
      data: receivedData,
    });
  } catch (error) {
    console.error(`❌ [ERROR] Server Error:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ GET: Retrieve Sensor Data (For Frontend)
app.get("/api/data", (req, res) => {
  console.log(`🟢 [LOG] Processing GET request to /api/data`);

  return res.status(200).json({
    message: "Sensor Data",
    data: sensorData,
  });
});

// ✅ Start Express Server (Glitch uses `process.env.PORT`)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// const express = require("express");
// const cors = require("cors");

// const app = express();

// // ✅ Enable CORS for Next.js, Arduino, and Mobile
// app.use(cors());
// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// // ✅ Store sensor data (Use a database for production)
// let sensorData = [];

// // ✅ POST: Receive Data from Arduino
// app.post("/api/data", (req, res) => {
//   console.log(`🟢 [LOG] Processing POST request to /api/data`);

//   try {
//     if (!req.body || typeof req.body !== "object") {
//       console.log(`❌ [ERROR] Invalid JSON received`);
//       return res.status(400).json({ message: "Invalid JSON format!" });
//     }

//     const { FeedTank, ProductTank, CIPTank, TDS } = req.body;

//     if (!FeedTank || !ProductTank || !CIPTank || !TDS) {
//       console.log(`❌ [ERROR] Missing fields in request body!`);
//       return res.status(400).json({ message: "Invalid data! Missing fields." });
//     }

//     const newData = {
//       FeedTank,
//       ProductTank,
//       CIPTank,
//       TDS,
//       timestamp: new Date().toISOString(),
//     };

//     sensorData.push(newData);

//     console.log(`✅ [SUCCESS] Data stored successfully!`, newData);

//     return res.status(200).json({
//       message: "Data received successfully!",
//       data: newData,
//     });
//   } catch (error) {
//     console.error(`❌ [ERROR] Server Error:`, error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // ✅ GET: Retrieve Sensor Data (For Frontend)
// app.get("/api/data", (req, res) => {
//   console.log(`🟢 [LOG] Processing GET request to /api/data`);

//   return res.status(200).json({
//     message: "Sensor Data",
//     data: sensorData,
//   });
// });

// // ✅ Start Express Server (Glitch uses `process.env.PORT`)
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
