import React from 'react'
import { Postform ,Container } from '../components'
function AddPost() {
    return (
        <div className='py-4'>
            <div className='w-full md:w-1/2 lg:w-2/3 mx-auto bg-white rounded shadow-lg p-6'>
                <Postform />
            </div>
        </div>
    )
}

export default AddPost
