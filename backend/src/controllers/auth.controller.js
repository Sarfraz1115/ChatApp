
// Ye file authentication se related functions ko define karti hai jaise signup, login, logout
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" });
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        const newUser = await User({
            fullName,
            email,
            password: hashpassword,
        })

        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilepic: newUser.profilepic,
            });
        }
        else {
            res.status(400).json({ messsage: "invalid user data" })
        }
    } catch (error) {
        console.log("error in signup", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMathch = await bcrypt.compare(password, user.password)
        if (!isMathch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilepic: user.profilepic,
        })

    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        });
        res.status(200).json({
            message: "Logout successfully"
        });
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(500).json({ message: "Internal server error" });

    }

}

export const updateProfile = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userId = req.user._id;

        if (!profilepic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updateUser = await User.findByIdAndUpdate(userId, { profilepic: uploadResponse.secure_url }, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log("error in update ", error);
        res.status(500).json({message: "internal server error"});
    }
}


export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller ", error.message);
        res.status(500).json({message: "internal server error"});
    }
}