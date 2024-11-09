import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-bounce delay-75"></div>
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-bounce delay-300"></div>
        </div>
    );
};

export default Loader;
