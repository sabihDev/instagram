import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Check for duplicate user by email
        const duplicate = await User.findOne({ email });
        if (duplicate) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        // Hash the password and create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });

        // Respond with success message
        res.status(201).json({ message: "User created successfully", success: true });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later", success: false });
    }


};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all required fields are present
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        // Prepare the user data for the response

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: user.posts
        };
        // Set the token as an HTTP-only cookie and return the response
        return res
            .cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 10*24 * 60 * 60 * 1000 })
            .status(200)
            .json({ message: `Welcome ${user.username}`, success: true, user: userData });

    } catch (error) {
        // Log the error and respond with a server error message
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later", success: false });
    }

};

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0 }).status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.log(error);
    }
};

export const getProfile = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID, excluding the password field
        const user = await User.findById(id).select("-password");

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Return the user data
        return res.status(200).json({ user, success: true });

    } catch (error) {
        // Log the error and respond with a server error message
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later", success: false });
    }

};

export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { gender, bio } = req.body;
        const profilePicture = req.file;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        let cloudResponse;
        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await User.findByIdAndUpdate(userId, user);
        return res.status(200).json({ message: "Profile updated successfully", success: true, user });

    } catch (error) {
        console.log(error);
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).limit(5).select('-password');
        if (!suggestedUsers) {
            return res.status(404).json({ message: "No suggested users found", success: false });
        }
        return res.status(200).json({ users: suggestedUsers, success: true });
    } catch (error) {
        console.log(error);
    }
};

export const followOrUnfollowUser = async (req, res) => {
    try {
        const followerUser = req.id;
        const followingUser = req.params.id;
        console.log(req);

        if (followerUser === followingUser) {
            return res.status(400).json({ message: "You cannot follow yourself", success: false });
        }

        const user = await User.findById(followerUser);
        const userToBeTarget = await User.findById(followingUser);
        if (!user || !userToBeTarget) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isFollowing = user.following.includes(followingUser);
        if (isFollowing) {
            await Promise.all([
                User.updateOne({ _id: followerUser }, { $pull: { following: followingUser } }),
                User.updateOne({ _id: followingUser }, { $pull: { followers: followerUser } })
            ]);

            return res.status(200).json({ message: "User unfollowed successfully", success: true });
        } else {
            await Promise.all([
                User.updateOne({ _id: followerUser }, { $push: { following: followingUser } }),
                User.updateOne({ _id: followingUser }, { $push: { followers: followerUser } })
            ]);

            return res.status(200).json({ message: "User followed successfully", success: true });
        }

    } catch (error) {
        console.log(error);
    }
}