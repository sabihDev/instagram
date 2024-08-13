import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'; // Import axios if not already done

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
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ), text: 'Profile', path: '/profile'
    },
    { icon: <LogOut />, text: 'Logout' },
]

const LeftSidebar = () => {
    const navigate = useNavigate();

    const LogoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
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
        } else if (item.path) {
            navigate(item.path);
        }
    }

    return (
        <div className='fixed top-0 left-0 z-10 px-4 border-r border-gray-200 w-[16%] h-screen'>
            <div className='flex flex-col'>
                <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
                <div>
                    {sidebarItems.map((item, index) => (
                        <div
                            onClick={() => sidebarHandler(item)}
                            key={index}
                            className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                        >
                            {item.icon}
                            <span className='text-sm font-medium'>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar;
