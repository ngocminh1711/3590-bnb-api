import mongoose,{ Schema, model } from "mongoose";

const UserSchesma = new Schema(
  {
    username: {
      type: "String",
      require: true,
    },
    email: {
      type: "String",
      require: true,
      unique: true,
    },
    password: { type: "String" },
    fromGoogle: {
      type: "Boolean",
      default: false,
    },
    image: {
      type: "String",
    },
  },
  { timestamps: true }
);
const User = model("user", UserSchesma);
export default User;
