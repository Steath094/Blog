import React,{useState,useEffect} from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'

const Skeleton = () => {
    return (
<div className='w-full h-screen py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {/* Placeholder for each post */}
                {[...Array(4)].map((_, index) => (
                    <div key={index} className='p-4 w-full md:w-1/4 animate-pulse'>
                        <div className='bg-white rounded-xl shadow-lg p-4'>
                            {/* Thumbnail Placeholder */}
                            <div className='w-full h-48 bg-gray-300 rounded-t-xl mb-4'></div>

                            {/* Header Placeholder */}
                            <div className='flex items-center space-x-2 mb-4'>
                                <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
                                <div className='h-4 bg-gray-300 rounded w-1/4'></div>
                                <div className='ml-auto h-4 bg-blue-100 rounded-full px-2 py-0.5 w-16'></div>
                            </div>

                            {/* Title Placeholder */}
                            <div className='h-6 bg-gray-300 rounded w-3/4 mb-4'></div>

                            {/* Excerpt Placeholder */}
                            <div className='h-4 bg-gray-300 rounded w-full mb-2'></div>
                            <div className='h-4 bg-gray-300 rounded w-5/6 mb-4'></div>

                            {/* Footer Placeholder */}
                            <div className='flex items-center space-x-4'>
                                <div className='flex items-center space-x-1'>
                                    <div className='w-5 h-5 bg-gray-300 rounded-full'></div>
                                    <div className='h-4 bg-gray-300 rounded w-6'></div>
                                </div>
                                <div className='flex items-center space-x-1'>
                                    <div className='w-5 h-5 bg-gray-300 rounded-full'></div>
                                    <div className='h-4 bg-gray-300 rounded w-6'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    </div>
    );
};
function AllPosts() {
    
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        service.getPosts().then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
            setIsLoading(false); // Set loading to false after fetching
        })
    },[])
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {isLoading ? (
                <Skeleton />
            ) :posts.map((post)=>(
                        <div key={post.$id} className='p-4 w-full md:w-1/4'>
                        <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
