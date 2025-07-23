const { createClient } = require("redis");

async function connectToRedis() {
  try {
    const redisClient = createClient({
      url: process.env.REDIS_URL, // Redis server URL (Memurai)
    });

    redisClient.on("error", (err) => {
      console.error("Redis connection error:", err);
    });

    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
}

module.exports = connectToRedis;
