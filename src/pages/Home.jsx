import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../components';
import { Link } from 'react-router-dom';

// Skeleton Loading Component
const SkeletonPostCard = () => {
    return (
        <div className="animate-pulse p-4 bg-white rounded-lg shadow-md">
            <div className="h-48 bg-gray-300 rounded-t-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
    );
};

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        service.getPosts().then((response) => {
            if (response) {
                setPosts(response.documents);
            }
            setIsLoading(false); // Set loading to false after fetching
        });
    }, []);

    if (posts.length === 0 && !isLoading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <Link
                                to="/login"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to read posts
                                </h1>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8 bg-gray-400'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {isLoading
                        ? [...Array(4)].map((_, index) => <SkeletonPostCard key={index} />) // Show skeletons while loading
                        : posts.map((post) => (
                            <div key={post.$id} className='p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                                {post.thumbnail && (
                                    <img src={post.thumbnail} alt={post.title} className='w-full h-48 object-cover rounded-t-lg mb-4' />
                                )}
                                <PostCard {...post} />
                            </div>
                        ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
