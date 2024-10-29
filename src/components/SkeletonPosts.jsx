import React from 'react'
const SkeletonPosts = () => {
    return (
        <div className="animate-pulse p-2 w-full md:w-1/4">
            <div className="h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
    );
};

export default SkeletonPosts;
