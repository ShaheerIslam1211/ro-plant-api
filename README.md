# RO Plant API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/ShaheerIslam1211/ro-plant-api/workflows/Node.js%20CI/badge.svg)](https://github.com/ShaheerIslam1211/ro-plant-api/actions)

A robust and scalable Node.js backend API for monitoring and controlling RO (Reverse Osmosis) plant systems. This project integrates sensor data via Arduino, serves the data through a RESTful API, and provides a dynamic Next.js frontend to display real-time information, notifications, and detailed logs.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

The **RO Plant API** project is designed to seamlessly integrate hardware sensor data with a modern web interface. Using an Arduino to collect sensor readings, the data is transmitted to our Node.js backend where it is processed and made available via API endpoints. The Next.js frontend consumes these endpoints to provide real-time updates, notifications, and formatted visualizations, ensuring every aspect of the RO plant's performance is monitored and displayed accurately.

---

## Features

- **Real-time Sensor Data:** Integrates Arduino sensor readings with the API.
- **API Endpoints:** RESTful API for fetching sensor data, system status, and logs.
- **Dynamic Frontend:** Next.js-based interface that updates in real time.
- **Notifications:** Alerts and updates on critical changes and sensor thresholds.
- **Modular Design:** Clean separation between backend, frontend, and hardware integrations.
- **Extensible:** Easily adaptable to new sensors and additional functionalities.

---

## Architecture

1. **Arduino & Sensors:**

   - Collects sensor data (e.g., water quality, pressure, temperature).
   - Sends data to the Node.js backend via HTTP or MQTT.

2. **Node.js Backend:**

   - Receives and processes sensor data.
   - Exposes RESTful API endpoints.
   - Implements business logic for notifications and data formatting.

3. **Next.js Frontend:**
   - Consumes API endpoints.
   - Renders real-time data and visualizations.
   - Provides user notifications and system status updates.

---

## Technologies Used

- **Backend:**

  - Node.js
  - Express.js (or similar framework)
  - [Additional libraries if any]

- **Frontend:**

  - Next.js
  - React
  - [Styling libraries e.g., Tailwind CSS, Styled Components, etc.]

- **Hardware Integration:**

  - Arduino
  - Sensors (various types)

- **Others:**
  - Git & GitHub for version control

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ShaheerIslam1211/ro-plant-api.git
   cd ro-plant-api
   ```

## Install dependencies for the backend:

```bash
cd backend
npm install
```

## Install dependencies for the frontend:

```bash
cd ../frontend
npm install
```

## Set up Environment Variables:

**Create a .env file in both backend and frontend directories with the required environment variables. For example**:

```bash
# backend/.env

PORT=5000
DATABASE_URL=your_database_url
API_KEY=your_api_key

# frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Run the Development Servers:

**Backend**:

```bash
cd backend
npm run dev
```

**Frontend**:

```bash
cd ../frontend
npm run dev
```

## Usage

## 📡 API Endpoints

### 🔹 **1. Send Sensor Data**

**Endpoint**:
`POST /api/sensor-data`

**Description**:
Receives data from Arduino and stores it in the database.

**Request Body (JSON)**:

```json
{
  "tds": 250,
  "ph": 7.2,
  "temperature": 24.5,
  "flowRate": 3.5
}
```

**Response**:

```json
{
  "message": "Data saved successfully",
  "data": {
    "tds": 250,
    "ph": 7.2,
    "temperature": 24.5,
    "flowRate": 3.5,
    "timestamp": "2024-02-05T10:00:00Z"
  }
}
```

### Access the Frontend

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### API Endpoints

Use tools like Postman or cURL to interact with the API at [http://localhost:5000/api](http://localhost:5000/api).

### Arduino Integration

Ensure your Arduino is correctly set up to send sensor data to the backend. Check the logs for data reception and processing.

### Notifications & Alerts

The system automatically triggers notifications when sensor readings exceed predefined thresholds. Customize these in the backend configuration.

---
