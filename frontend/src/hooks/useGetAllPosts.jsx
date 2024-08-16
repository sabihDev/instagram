import { setPosts } from '@/redux/postSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllPosts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/post/all', { withCredentials: true });
                console.log(res.data.posts);
                if (res.data.success) {
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchAllPosts();
    }, [dispatch]);  // Add 'dispatch' as a dependency

    // No need for a return statement unless you plan to return data or functions
};

export default useGetAllPosts;
