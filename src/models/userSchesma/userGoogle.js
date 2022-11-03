import { Schema, model } from "mongoose";

const UserSchesma = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    google_id:{
        type:String
    },
    image: {
      type: String,
    },
    role:{
        type:String,
        default:"user"
    },
    email_verify:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);
const UserGoogle = model("userGoogle", UserSchesma);
export default UserGoogle;
