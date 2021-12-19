const request = require("supertest");

const app = require("../../src/app");
const factory = require("../factories");
const truncate = require("../utils/truncate");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });
  it("should authentincate with valid credentials", async () => {
    const mockPassword = "testPassword";
    const user = await factory.create("User", { password: mockPassword });

    const mockUserLogin = {
      email: user.email,
      password: user.password,
    };

    const response = await request(app).post("/sessions").send(mockUserLogin);

    expect(response.status).toBe(200);
  });

  it("shouldn't authentincate with invalid credentials", async () => {
    const { dataValues: user } = await factory.create("User");

    const mockUserLogin = {
      email: user.email,
      password: "321123",
    };

    const response = await request(app).post("/sessions").send(mockUserLogin);

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const { dataValues: user } = await factory.create("User");

    const response = await request(app)
      .post("/sessions")
      .send({ email: user.email, password: user.password });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without jwt token", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 123123`);

    expect(response.status).toBe(401);
  })
});
