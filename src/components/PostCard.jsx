import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'
function PostCard({
    $id,
    title,
    featuredImage
}) {
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-[#ffffff] rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img className='w-full rounded-xl h-64 object-cover' src={service.getFilePreview(featuredImage)} alt={title} />
                </div>
                <h2 className='text-2xl font-semibold text-gray-900'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
