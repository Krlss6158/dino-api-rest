import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true,
      min: [2, 'El mínimo de carácteres para Nombres es 2'],
      max: [75, 'El máximo de carácteres para Nombres es 75'],
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
      min: [2, 'El mínimo de carácteres para Apellidos es 2'],
      max: [75, 'El máximo de carácteres para Apellidos es 75'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      min: [6, 'El mínimo de carácteres para Correo electrónico es 6'],
      max: [100, 'El máximo de carácteres para Correo electrónico es 100'],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      min: [8, 'El mínimo de carácteres para Contraseña es 6']
    },
    address: {
      type: String,
      trim: true,
      max: [100, 'El máximo de carácteres para Dirección es 100'],
    },
    country: {
      type: String,
      trim: true,
      max: [100, 'El máximo de carácteres para País es 100'],
    },
    city: {
      type: String,
      trim: true,
      max: [100, 'El máximo de carácteres para Ciudad es 100'],
    },
    postal_code: {
      type: String,
      trim: true,
      max: [8, 'El máximo de carácteres para Código postal es 8'],
    },
    description: {
      type: String,
      trim: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    token:{
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

productSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model("User", productSchema);
