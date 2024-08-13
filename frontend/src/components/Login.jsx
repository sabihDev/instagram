import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'

const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(input);
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
                setInput({
                    email: '',
                    password: ''
                });
            }
            else {
                toast.error(res.data.message);
                setInput({
                    email: '',
                    password: ''
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex w-screen h-screen items-center justify-center'>
            <form onSubmit={loginHandler} className='flex flex-col shadow-lg gap-5 p-8'>
                <div className='my-4'>
                    <h1 className='font-bold text-center text-xl'>LOGO</h1>
                    <p className='font-sm text-center'>Login to see photos and videos of your friends</p>
                </div>

                <div>
                    <Label className="font-medium">Email</Label>
                    <Input type="email" className="my-2" name="email" value={input.email} onChange={changeEventHandler} />
                </div>

                <div>
                    <Label className="font-medium">Password</Label>
                    <Input type="password" className="my-2" name="password" value={input.password} onChange={changeEventHandler} />
                </div>

                {loading ? (
                    <Button>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading
                    </Button>
                ) : (<Button type="submit">Login</Button>)}

                <span>Don't have an account? <Link to="/signup" className='text-blue-500'>Sign up</Link></span>
            </form>
        </div>
    )
}

export default Login