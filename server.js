const app = require("./index");
const PORT = process.env.PORT;
const { connectDB, disconnectDB } = require("./database");

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit();
});
