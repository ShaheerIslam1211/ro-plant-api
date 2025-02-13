const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Ensure Axios is installed

const app = express();

// ✅ Enable CORS for Next.js, Arduino, and Mobile
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ✅ Store sensor data (Use a database for production)
let sensorData = [];

// ✅ Function to get timezone based on IP address (Using ipwhois.app)
const getUserTimezone = async (ip) => {
  try {
    console.log(`🌍 Fetching timezone for IP: ${ip}`);

    const response = await axios.get(`https://ipwhois.app/json/${ip}`);
    if (response.data && response.data.timezone) {
      return response.data.timezone;
    } else {
      console.warn(`⚠️ No timezone found for IP: ${ip}, defaulting to UTC.`);
      return "UTC"; // Default to UTC if no timezone found
    }
  } catch (error) {
    console.error(
      `❌ [ERROR] Failed to get timezone for IP: ${ip}`,
      error.message
    );
    return "UTC"; // Fallback to UTC
  }
};

// ✅ Function to Get Local Time in the Correct Timezone
const getFormattedTimestamp = (timezone) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Show AM/PM format
    timeZone: timezone, // Use detected timezone
  }).format(new Date());
};

// ✅ Function to Get Real IP Address
const getClientIP = (req) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || "";
  ip = ip.split(",")[0].trim(); // Get first IP if multiple are present
  if (ip === "::1" || ip === "127.0.0.1") ip = "8.8.8.8"; // Use a public IP for local testing
  return ip;
};

// ✅ POST: Receive Data from Arduino or Frontend
app.post("/api/data", async (req, res) => {
  console.log(`🟢 [LOG] Processing POST request to /api/data`);
  console.log(`📩 Headers:`, req.headers);
  console.log(`📩 Body:`, req.body);

  try {
    if (!req.body || typeof req.body !== "object") {
      console.log(`❌ [ERROR] Invalid JSON received`);
      return res.status(400).json({ message: "Invalid JSON format!" });
    }

    // ✅ Get the real client IP
    let userIp = getClientIP(req);
    console.log(`🌍 Detected IP: ${userIp}`);

    // ✅ Detect user's timezone using IP
    let userTimezone = await getUserTimezone(userIp);
    console.log(`⏰ Detected Timezone: ${userTimezone}`);

    // ✅ Store received data with correct timestamp
    const receivedData = {
      ...req.body,
      timestamp: getFormattedTimestamp(userTimezone),
    };

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

// ✅ Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    `✅ Server running on port ${PORT}, default timezone: ${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    }`
  )
);
