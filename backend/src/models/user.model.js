import mongoose from "mongoose";

/* 
- Ye file user ka "database model" define karti hai.
- Jaise user ke fields: name, email, password, etc.
- Naam mein .model.js lagane se samajh aata hai ki is file mein database ka structure ya schema define hai.
*/
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    password: {
        type : String,
        required: true,
        minlength: 6,
    },
    profilepic:{
        type: String,
        default: ""
    },
},
{timestamps: true});

// in mongodb, name of mode like below "user" model so first letter should be in capital letter.
const User = mongoose.model("User", userSchema);
export default User;