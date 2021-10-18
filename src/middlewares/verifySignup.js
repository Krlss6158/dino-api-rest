import User from "../models/User";
import { ROLES } from "../models/Role";

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "El correo electrónico ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.rol) {
    for (let i = 0; i < req.body.rol.length; i++) {
      if (!ROLES.includes(req.body.rol[i])) {
        return res.status(400).json({
          message: `Rol ${req.body.rol[i]} no existe`,
        });
      }
    }
  }

  next();
};

export { checkDuplicateEmail, checkRolesExisted };
