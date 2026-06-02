const http = require("http");
const app = require("./src/app");
const { connectDB } = require("./src/config/db");
const { env } = require("./src/config/env");

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  server.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend server running on port ${env.port}`);
  });
};

startServer();
