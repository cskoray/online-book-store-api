const request = require("supertest");
const app = require("../../index");

test("GET /nonexistent - should handle 404 Not Found", async () => {
  const res = await request(app).get("/nonexistent");

  expect(res.statusCode).toBe(404);
  expect(res.body).toEqual({});
});
