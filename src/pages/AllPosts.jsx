import React,{useState,useEffect} from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'
function AllPosts() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        service.getPosts().then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-4 w-full md:w-1/4'>
                        <PostCard {...post}/>
                        </div>
                    ))}
                    {posts.length === 0 && <h1>No Posts Yet</h1>}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
