const request = require("supertest");
const app = require("../../index");
const Book = require("../../models/book");
const { connectDB, disconnectDB } = require("../../database");

describe("Book Controller", () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await Book.deleteMany({});
  });

  test("GET /api/books - should get all books", async () => {
    const booksData = [
      { title: "Book 1", author: "Author 1", price: 20 },
      { title: "Book 2", author: "Author 2", price: 25 },
      { title: "Book 3", author: "Author 3", price: 15 },
    ];

    await Book.insertMany(booksData);

    const res = await request(app).get("/api/books");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  test("GET /api/books - should handle empty book list", async () => {
    const res = await request(app).get("/api/books");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});
