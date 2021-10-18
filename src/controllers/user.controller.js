import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config";

export const createUser = async (req, res) => {
  try {
    const { first_name,
      last_name,
      email,
      address,
      country,
      city,
      postal_code,
      description,
      password,
      roles = req.body.role ? req.body.role : 'user'
    } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      first_name,
      last_name,
      email,
      password,
      address,
      country,
      city,
      postal_code,
      description,
      token: jwt.sign({ email: email }, config.SECRET),
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      email: savedUser.email,
      address: savedUser.address,
      country: savedUser.country,
      city: savedUser.city,
      postal_code: savedUser.postal_code,
      description: savedUser.description,
      token: savedUser.token,
      roles: savedUser.roles,
    });
  } catch (error) {
    res.status(500).json({ message: error })
    console.error(error);
  }
};

export const getUsers = async (req, res) => { };

export const getUser = async (req, res) => { };
