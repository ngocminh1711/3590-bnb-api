import { Schema, model } from "mongoose";

const UserSchesma = new Schema(
  {
    username: {
      type: String,
    },
    name:{
      type: String,
      default: function(){
        if(this.username){
          return this.username
        }
      }
    },
    email: {
      type: String,
    },
    google_id:{
        type:String
    },
    backdrop_Image:{
      type: String,
      default:"https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80"
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
    },
    phone: {
      type: Number,
      default: ''
    },
    address: {
      type: String,
      default:""
    }
  },
  { timestamps: true }
);
const UserGoogle = model("userGoogle", UserSchesma);
export default UserGoogle;
