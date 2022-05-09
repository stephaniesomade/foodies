const mongoose = require("mongoose")

require("../mongodb_helper_test");
const User = require("../../models/users");

describe("User model", () => {
  // beforeEach((done) =>{
  //   mongoose.connection.collections.user.drop(() =>{
  //     done();
  //   });
  // });

  it("has an name", () =>{
    const user = new User({
      name: "batman",
      email: "batman@example.com",
      password: "password"
    });
    expect(user.name).toEqual("batman");
  });

  it("has an email address", () =>{
    const user = new User({
      name: "batman",
      email: "batman@example.com",
      password: "password"
    });
    expect(user.email).toEqual("batman@example.com");
  });

  it("has a password", () =>{
    const user = new User({
      username: "batman",
      email: "batman@example.com",
      password: "password"
    });
    expect(user.password).toEqual("password");
  });
});