
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

let io: Server | null = null;

// 🔥 Initialize socket
export function initSocket(server: HTTPServer) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🔥 User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

// 🔥 Get socket instance anywhere in app
export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
