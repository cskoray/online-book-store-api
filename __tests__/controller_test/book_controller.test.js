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

  test("GET /api/books - should get all books - in pageSize of 10", async () => {
    const booksData = [];

    for (let i = 0; i < 15; i++) {
      const Book = {
        title: `Book ${i + 1}`,
        author: `Author ${i + 1}`,
        price: Math.floor(Math.random() * 101),
      };
      booksData.push(Book);
    }

    await Book.insertMany(booksData);

    const res = await request(app).get("/api/books");

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(10);
  });

  test("GET /api/books - should handle empty book list", async () => {
    const res = await request(app).get("/api/books");

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(0);
    expect(res.body.cursor).toBe(null);
  });
});
