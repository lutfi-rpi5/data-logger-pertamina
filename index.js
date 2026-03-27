// index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// const { initMqtt } = require("./src/controllers/mqttController");
// const { initSocket } = require("./src/controllers/socketController");
const webRoutes = require("./src/routes/web");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// URL
app.use(
  cors({
    origin: ["https://pertamina.raxva.site"],
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// localhost test
// app.use(cors({
//   origin: ["http://localhost:3000"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }))

app.use(express.json());
// Serve static dari src/public
app.use(
  express.static("src/public", {
    etag: false,
    lastModified: false,
    setHeaders: (res, path) => {
      res.setHeader("Cache-Control", "no-store");
    },
  }),
);

// Routes
app.use("/", webRoutes);

// Init socket + MQTT
// initSocket(io);
// initMqtt(io);

const PORT = 3001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} (bind 0.0.0.0)`);
});
