import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//wss connected
wss.on("connection", (socket) => {
  // initial log
  console.log("New Connection Initialized!");

  // send the message
  socket.send("Welcome to the WebSocket server!");

  // disconnect
  socket.on("close", () => {
    console.log("Client Disconnected...");
  });

  //error handle
  socket.on("error", (error) => {
    console.error("WebSocket Error:", error);
  });
});

// wss close
wss.on("close", () => {
  console.log("WebSocket Server Closed.");
});
