const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const mockCreateUser = {
      name: "Guilherme",
      password: "123456",
  
      email: "guilhermeteixeiraais@gmail.com",
    };
    const user = await User.create(mockCreateUser);

    const compareHash = await bcrypt.compare(mockCreateUser.password, user.password_hash)
    expect(compareHash).toBe(true);
  });
});
