import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'; // Import axios if not already done
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'



const LeftSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(store => store.auth);

    const [open,setOpen] = useState(false)

    const LogoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate('/login');
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    }

    const sidebarHandler = (item) => {
        if (item.text === 'Logout') {
            LogoutHandler();
        } else if (item.text === 'Create') {
            setOpen(true);
        }
    }

    const sidebarItems = [
    { icon: <Home />, text: 'Home', path: '/' },
    { icon: <Search />, text: 'Search', path: '/search' },
    { icon: <TrendingUp />, text: 'Explore', path: '/explore' },
    { icon: <MessageCircle />, text: 'Messages', path: '/messages' },
    { icon: <Heart />, text: 'Notifications', path: '/notifications' },
    { icon: <PlusSquare />, text: 'Create', path: '/create' },
    {
        icon: (
            <Avatar className="w-6 h-6">
                <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ), text: 'Profile', path: '/profile'
    },
    { icon: <LogOut />, text: 'Logout' },
]

    return (
        <div className='fixed top-0 left-0 z-10 px-4 border-r border-gray-200 w-[20%] h-screen'>
            <div className='flex flex-col'>
                <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
                <div>
                    {sidebarItems.map((item, index) => (
                        <div
                            onClick={() => sidebarHandler(item)}
                            key={index}
                            className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3'
                        >
                            {item.icon}
                            <span className='text-lg font-medium'>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <CreatePost open={open} setOpen={setOpen}/>
        </div>
    )
}

export default LeftSidebar;
