import { createServer } from "http";
import next from "next";
import { initSocket } from "./socket";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handler(req, res);
  });

  // 🔥 Initialize Socket.io
  initSocket(httpServer);

  httpServer.listen(port, () => {
    console.log(`🚀 Server running on http://${hostname}:${port}`);
  });
});
