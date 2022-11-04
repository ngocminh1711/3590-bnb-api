import mongoose,{ Schema, model } from "mongoose";

const UserSchesma = new Schema(
  {
    username: {
      type: "String",
      require: true,
    },
    // name:{
    //   type:"String",
    //   default:function(){
    //     if(this.username){
    //       return this.username
    //     }
    //     return null;
    //   }
    // },
    email: {
      type: "String",
      require: true,
      unique: true,
    },
    password: { type: "String" },
    image: {
      type: "String",
    },
    phone:{
      type: Number,
      default:''
    }, 
    address: {
      type: "String",
      default:""
    }
  },
  { timestamps: true }
);
const User = model("user", UserSchesma);
export default User;
