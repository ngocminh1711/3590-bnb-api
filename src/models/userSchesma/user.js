import mongoose, { Schema, model } from "mongoose";

const UserSchesma = new Schema(
    {
        username: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            default: function () {
                if (this.username) {
                    return this.username;
                }
                return "";
            },
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: { type: String },
        image: {
            type: String,
            default:
                "https://i.pinimg.com/564x/c4/58/82/c45882f8d73113188c8f7ff6f3aded67.jpg",
        },
        backdrop_Image: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80",
        },
        role: {
            type: String,
            default: "user",
        },
        phone: {
            type: Number,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
        google_id: {
            type: String
        }
    },
    { timestamps: true }
);
const User = model("user", UserSchesma);
export default User;
///