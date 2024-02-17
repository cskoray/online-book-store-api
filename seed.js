const mongoose = require("mongoose");
const seedData = require("./seeders/seed_data.json");

async function seedDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookstore");

    const User = require("./models/user");
    const Book = require("./models/book");

    await User.insertMany(seedData.users);
    await Book.insertMany(seedData.books);

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
