import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.json({ status: 401, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.email = decoded.email;

    /* const user = await User.findById(req.email, { password: 0 }); */
    const user = await User.findOne({ email: req.email });
    if (!user) return res.json({ status: 404, message: "No user found" });

    next();
  } catch (error) {
    return res.json({ status: 403, message: "Unauthorized!" });
  }
};

/* export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
}; */

export const isAdmin = async (req, res, next) => {


  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.json({ status: 403, message: "Require Admin Role!" });
  } catch (error) {
    console.log(error)
    return res.json({ status: 500, message: error });
  }
};
