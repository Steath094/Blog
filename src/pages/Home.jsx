import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from '../appwrite/config';

import { Container, Loader, PostCard } from '../components';
import { Link } from 'react-router-dom';
import {Button} from '../components';
// Skeleton Loading Component
const SkeletonPostCard = () => (
    <div className="relative min-w-[260px] max-w-xs p-4 bg-white rounded-xl shadow-lg animate-pulse">
        {/* Thumbnail Placeholder */}
        <div className="w-full h-48 bg-gray-300 rounded-t-xl"></div>

        {/* Header Placeholder */}
        <div className="flex items-center mt-4 space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="ml-auto h-4 bg-blue-100 rounded-full px-2 py-0.5 w-16"></div>
        </div>

        {/* Title Placeholder */}
        <div className="mt-4 h-6 bg-gray-300 rounded w-3/4"></div>

        {/* Excerpt Placeholder */}
        <div className="mt-2 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-5/6"></div>

        {/* Footer Placeholder */}
        <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-6"></div>
            </div>
            <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-6"></div>
            </div>
        </div>

        {/* Button Placeholder */}
        <div className="absolute bottom-4 right-4 h-8 bg-blue-300 rounded-full w-24"></div>
    </div>
);

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const postState = useSelector((state) => state.post.posts);
    const fetchDocuments = async () => { 
        setIsLoading(true);
        try {
          const response = await service.getPosts();
          const { documents } = response;
          if (documents?.length) {
            setPosts((prevPosts) => {
              const newPosts = documents.filter(
                (doc) => !prevPosts.some((post) => post.$id === doc.$id)
              );
              return [...prevPosts, ...newPosts];
            });
          }
        } catch (error) {
          console.error("Error fetching documents:", error);
        } finally {
          setIsLoading(false);
        }
      };
      useEffect(() => {
        if (!authStatus && !postState.length) {
          fetchDocuments();
        } else {
          if (!postState?.length) fetchDocuments();
          else setPosts(postState);
        }
      }, [authStatus]);
    // useEffect(() => {
    //     service.getPosts().then((response) => {
    //         if (response) {
    //             setPosts(response.documents);
    //         }
    //         setIsLoading(false); // Set loading to false after fetching
    //     });
    // }, []);
    if (posts.length === 0 && !isLoading) {
        return (
            <div className="flex  justify-center items-center flex-wrap w-full text-center bg-[url('/images/Home.png')] bg-cover bg-center min-h-[85vh]">
                <Container>
                    <div className="flex flex-row gap-0 justify-center items-center flex-wrap w-full ">
                        <div className="md:w-[566px] md:h-[387px] w-[300px] h-[220px] relative top-10">
                            <div className="bg-[url('/images/Smileyhome.png')] bg-cover bg-center w-full h-full"></div>
                        </div>
                        <div className="flex flex-col md:items-end md:text-8xl text-2xl relative top-10 font-inter font-semibold md:relative md:right-16">
                            <p>Write Your</p>
                            <h1 className='bg-gradient-to-r from-[#3652E1] via-[#8057F5] to-[#7851E8] bg-clip-text text-transparent'>Article</h1>
                            <p>here</p>
                            <div className='md:relative md:bottom-8'>
                            <Link to={'/login'} className='w-fit h-fit'>
                                <Button type="button" className="px-6 text-lg rounded-[100px] bg-gradient-to-r from-[#3652E1] via-[#8057F5] to-[#7851E8]">Join Community</Button>
                            </Link>
                            </div>


                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="flex md:flex-row flex-col justify-center items-center w-full min-h-screen py-8 bg-[url('/images/Article.png')] bg-cover bg-center">
            {/* Title Section */}
                <div className="flex flex-col w-2/5 items-center justify-center px-4 mb-12 ">
                    <h1 className="text-8xl text-black leading-tight font-medium font-inter">
                        Best <br /> <span className='text-white'>Article</span> <br /> Today
                    </h1>
                    <Link
                        to="/all-posts"
                        className="min-w-44 mt-6 px-6 py-3 text-lg font-medium text-blue-600 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 relative right-14"
                    >
                        See All Articles
                    </Link>
                </div>

            {/* Post Cards Section */}
                <div className="flex space-x-6 md:w-3/5 w-[85%] z-10 overflow-x-scroll .no-scrollbar ">
                    {isLoading
                        ? [...Array(4)].map((_, index) => <SkeletonPostCard key={index} />)
                        : posts.map((post) => (
                            <div
                                key={post.$id}
                                className="relative min-w-[260px] max-w-xs p-4 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105"
                            >
                                {/* Post Thumbnail */}
                                {post.featuredImage && (
                                    <img
                                        src={service.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full h-48 object-cover rounded-t-xl"
                                    />
                                )}

                                {/* Post Header */}
                                <div className="flex items-center mt-4 space-x-2">
                                    <img
                                        src={post.authorAvatar || "/images/userlogo.png"}
                                        alt={post.author}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                                    <span className="ml-auto text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
                                        {post.category}
                                    </span>
                                </div>

                                {/* Post Content */}
                                <h2 className="mt-4 text-lg font-semibold text-gray-900 leading-tight">
                                    {post.title}
                                </h2>
                                <p className="mt-2 text-sm text-gray-600">
                                    {post.excerpt || "A brief description of the article goes here..."}
                                </p>

                                {/* Post Footer */}
                                <div className="flex items-center mt-4 text-gray-500 space-x-4">
                                </div>

                                {/* Read More Button */}
                                <Link
                                    to={`/post/${post.$id}`}
                                    className="absolute bottom-4 right-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Read More
                                </Link>
                            </div>
                        ))}
                </div>
                
        </div>
    );
}

export default Home;
