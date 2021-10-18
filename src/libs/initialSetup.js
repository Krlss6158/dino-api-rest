import Role from "../models/Role";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  const roles = await Role.findOne({ name: "admin" });
  // get roles _id
  /* const roles = await Role.find({ name: { $in: ["admin", "moderator"] } }); */

  if (!user) {
    // create a new admin user
    await User.create({
      first_name: "root",
      last_name: "dino",
      email: "root@dino.com",
      password: await bcrypt.hash("admin", 10),
      address: '',
      country: '',
      city: '',
      postal_code: '',
      description: '',
      roles: roles._id,
      token: jwt.sign({ email: 'admin@localhost' }, config.SECRET)
    });
    console.log('Admin User Created!')
  }
};
