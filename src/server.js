require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const port = process.env.PORT || 4000;

function registerProcessErrorHandlers() {
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled promise rejection:", reason);
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
    process.exit(1);
  });
}

async function start() {
  try {
    await connectDB();

    const server = app.listen(port, () => {
      console.log(`Finance backend running on port ${port}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${port} is already in use. Stop the running server process and try again.`
        );
        process.exit(1);
      }

      console.error("HTTP server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Server start failed", error);
    process.exit(1);
  }
}

registerProcessErrorHandlers();
start();
