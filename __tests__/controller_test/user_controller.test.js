const request = require("supertest");
const app = require("../../index");
const User = require("../../models/user");
const { connectDB, disconnectDB } = require("../../database");

describe("User Controller", () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("POST /api/users/register - should register a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "some@email.com",
      password: "password123",
      address: "some address",
      phone: "+1234567890",
      paymentCard: {
        cardNumber: "1111222233334444",
        expirationDate: "12/24",
        cvv: "123",
      },
    };

    const res = await request(app).post("/api/users/register").send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "John Doe");
    expect(res.body).toHaveProperty("email", "some@email.com");
  });

  test("POST /api/users/register - should handle duplicate email registration", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      address: "somewhere in the world",
      phone: "+1234567890",
      paymentCard: {
        cardNumber: "1111222233334444",
        expirationDate: "12/24",
        cvv: "123",
      },
    };

    await request(app).post("/api/users/register").send(userData);

    const res = await request(app).post("/api/users/register").send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "john@example.com" }'
    );
  });
});
