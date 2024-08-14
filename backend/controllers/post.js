import sharp from "sharp";
import User from "../models/User.js";
import Post from "../models/Post.js";
import cloudinary from '../utils/cloudinary.js';
import Comment from "../models/Comment.js";

export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const optimizedImageBuffer = await sharp(image.buffer).resize({width:800, height:800, fit:"inside"}).toFormat('jpeg',{quality: 80}).toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });

        const user = await User.findById(authorId);
        if(user){
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({path:'author', select:'-password'});

        return res.status(200).json({message:"New post added", post, success: true });

    } catch (error) {
        console.log(error);        
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1}).populate({path:'author', select:'username, profilePicture'}).populate({path:'comments',sort:{createdAt:-1},populate:{path:'author', select:'username, profilePicture'}});

        return res.status(200).json({posts, success: true});
    } catch (error) {
        console.log(error);        
    }
}

export const getPostsOfUser = async (req, res) => {
    try {
        const userId = req.id;

        const posts = await Post.find().sort({createdAt:-1}).populate({path:'author', select:'username, profilePicture'}).populate({path:'comments',sort:{createdAt:-1},populate:{path:'author', select:'username, profilePicture'}});

        return res.status(200).json({posts, success: true});
    } catch (error) {
        console.log(error);        
    }
}

export const likePost = async (req, res) => {
    try {

        const likerUserId = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message:"Post not found", success: false});
        }
        await post.updateOne({$addToSet:{likes:likerUserId}});
        await post.save();

        return res.status(200).json({message:"Post liked", success: true});
        
    } catch (error) {
        console.log(error);        
    }
}

export const dislikePost = async (req, res) => {
    try {
        const likerUserId = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message:"Post not found", success: false});
        }
        await post.updateOne({$pull:{likes:likerUserId}});
        await post.save();

        return res.status(200).json({message:"Post disliked", success: true});
    } catch (error) {
        console.log(error);        
    }
}

export const addComments = async (req, res) => {
    try {
        const commenterUserId = req.id;
        const postId = req.params.id;
        const {text} = req.body;
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message:"Post not found", success: false});
        }
        
        const comment = await Comment.create({
            text,
            author: commenterUserId,
            post: postId
        }).populate({path:'author', select:'username, profilePicture'});

        post.comments.push(comment._id);
        await post.save();

        return res.status(200).json({message:"Comment added", comment, success: true});
    } catch (error) {
        console.log(error);        
    }
}

export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const comments = await Comment.find({post: postId}).populate({path:'author', select:'username, profilePicture'});

        if(!comments){
            return res.status(404).json({message:"Comments not found", success: false});
        }

        return res.status(200).json({comments, success: true});
    } catch (error) {
        console.log(error);        
    }
}

export const deletePost = async (req, res) => {

    try {
        
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) res.status(404).json({message:"Post not found", success: false});

        if(post.author.toString() !== authorId) res.status(403).json({message:"You are not authorized to delete this post", success: false});

        await Post.findByIdAndDelete(postId);

        let user = await User.findById(authorId);
        user.posts = user.posts.filter((id) => id.toString() !== postId);
        await user.save();

        await Comment.deleteMany({post: postId});
        return res.status(200).json({message:"Post deleted", success: true});

    } catch (error) {
        console.log(error);        
    }
}

export const bookmarkPost = async (req, res) => {
    try {
        const userId = req.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if(!post) res.status(404).json({message:"Post not found", success: false});

        const user = await User.findById(userId);
        if(!user) res.status(404).json({message:"User not found", success: false});

        let isUserAlreadyBookmarked = user.bookmarks.includes(post._id);
        if (isUserAlreadyBookmarked) {
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'unsaved',message:"Post unbookmarked", success: true});
        } 
        else {
            await user.updateOne({$addToSet:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'saved',message:"Post bookmarked", success: true});
        }
    } catch (error) {
        console.log(error);        
    }
}