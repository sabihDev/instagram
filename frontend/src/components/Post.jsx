import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog'; // Import DialogTitle
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { Button } from './ui/button';
import { FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice.js';
import axios from 'axios';
import { toast } from 'sonner';

const Post = ({ post }) => {
    

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const [liked,setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLike,setPostLike] = useState(post.likes.length);
    const dispatch = useDispatch();


    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) setText(inputText);
        else setText('');
    };

     const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`https://instaclone-g9h5.onrender.com/api/v1/post/${post._id}/${action}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // apne post ko update krunga
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, { withCredentials: true });
            if (res.data.success) {
                let updatedPosts = posts.filter((p) => p?._id !== post?._id);
                dispatch(setPosts(updatedPosts));
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={post.author?.profilePicture} alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>{post.author.username}</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className='flex flex-col items-center text-sm text-center'>
                        <DialogTitle>Post Options</DialogTitle> {/* Add DialogTitle */}
                        <Button variant='ghost' className='cursor-pointer w-fit text-[#ED4956]'>Unfollow</Button>
                        <Button variant='ghost' className='cursor-pointer w-fit'>Add to favorites</Button>
                        {
                            user && user?._id === post.author._id &&
                            <Button onClick={()=>deletePostHandler(post.id)} variant='ghost' className='cursor-pointer w-fit'>Delete</Button>
                        }
                    </DialogContent>
                </Dialog>
            </div>
            <img className='rounded-sm my-2 w-full aspect-square object-cover' src={post.image}
                alt='post_image' />
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <FaRegHeart onClick={likeOrDislikeHandler} size={'22px'} className='cursor-pointer hover:text-gray-600' />
                    <MessageCircle onClick={() => setOpen(true)} className='cursor-pointer hover:text-gray-600' />
                    <Send className='cursor-pointer hover:text-gray-600' />
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600' />
            </div>
            <span className='font-semibold block mb-2'>{post.likes.length} likes</span>
            <p>
                <span className='mr-2 font-semibold'>{post.author.username}</span>
                {post.caption}
            </p>
            <span className='cursor-pointer' onClick={() => setOpen(true)}>View all 10 comments</span>
            <CommentDialog open={open} setOpen={setOpen} post={post} />
            <div className='flex items-center justify-between'>
                <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment' className='outline-none text-sm w-full' />
                {text && <span className='text-[#3BADF8] cursor-pointer'>Post</span>}
            </div>
        </div>
    );
};

export default Post;
