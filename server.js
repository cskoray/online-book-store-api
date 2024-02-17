const app = require("./index");
const PORT = process.env.PORT;
const { connectDB, disconnectDB } = require("./database");

connectDB(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit();
});
