import mongoose, { Schema } from "mongoose";

const UserSchesma = new Schema(
  {
    name: {
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
export default mongoose.model("User", UserSchesma);
