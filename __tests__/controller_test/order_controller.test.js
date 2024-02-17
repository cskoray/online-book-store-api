const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../index");
const User = require("../../models/user");
const Book = require("../../models/book");
const Order = require("../../models/order");
const { connectDB, disconnectDB } = require("../../database");

describe("Order Controller", () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Book.deleteMany({});
    await Order.deleteMany({});
  });

  const generateValidToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    const payload = {
      userId: user._id.toString(),
      email: user.email,
    };
    console.log("payload", payload);
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  };

  test("POST /api/orders - should create a new order", async () => {
    const userData = {
      name: "John Doe",
      email: "some@email.com",
      password: "password123",
      address: "somewhere in the world",
      phone: "+1234567890",
      paymentCard: {
        cardNumber: "1111222233334444",
        expirationDate: "12/24",
        cvv: "123",
      },
    };

    const bookData = { title: "Book 1", author: "Author 1", price: 20 };

    const user = await User.create(userData);
    const book = await Book.create(bookData);

    const token = generateValidToken(user);

    const bookOrderData = {
      _id: book._id.toString(),
      title: "Book 1",
      author: "Author 1",
      price: 20,
    };
    const orderData = {
      userId: user._id.toString(),
      books: [bookOrderData],
    };

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send(orderData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user", user._id.toString());
    expect(res.body.books).toHaveLength(1);
  });

  test("GET /api/orders/user/:userId - should fail to get orders for a different user", async () => {
    const userData1 = {
      name: "John Doe",
      email: "john@email.com",
      password: "password123",
      address: "Somewhere",
      phone: "+1234567890",
      paymentCard: {
        cardNumber: "1111222233334444",
        expirationDate: "12/24",
        cvv: "123",
      },
    };

    const userData2 = {
      name: "Jane Doe",
      email: "jane@email.com",
      password: "password456",
      address: "Another Place",
      phone: "+9876543210",
      paymentCard: {
        cardNumber: "5555666677778888",
        expirationDate: "12/25",
        cvv: "456",
      },
    };
    const user1 = await User.create(userData1);
    const user2 = await User.create(userData2);

    const token1 = generateValidToken(user1);
    const token2 = generateValidToken(user2);

    const bookData = { title: "Book 1", author: "Author 1", price: 20 };
    const book = await Book.create(bookData);

    const bookOrderData = {
      _id: book._id.toString(),
      title: "Book 1",
      author: "Author 1",
      price: 20,
    };

    const orderData = {
      userId: user1._id.toString(),
      books: [bookOrderData],
    };

    const orderRes = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token1}`)
      .send(orderData);

    console.log("orderRes", orderRes.body);

    const res = await request(app)
      .get(`/api/orders/${user2._id}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("error");
  });
});
