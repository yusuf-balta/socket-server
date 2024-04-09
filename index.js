const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const port = process.env.PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  console.log("/ isteği geldi");
  res.send("başarılı");
});

io.on("connection", (socket) => {
  socket.on("any", (v) => io.sockets.emit("any", v));

  console.log(socket.id, " user connected");
});

server.listen(port, () => {
  console.log("listening on *:80", port);
});
