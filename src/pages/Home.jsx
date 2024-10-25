import React, {useEffect,useState} from 'react'
import service from '../appwrite/config'
import { Container,PostCard } from '../components'
import { Link } from 'react-router-dom'
function Home() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        service.getPosts().then((posts)=>{            
            if (posts) {
                setPosts(posts.documents)
            }
        })
       },[])
    if (posts.length===0) {
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
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap gap-y-3'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                            
                        </div>
                        
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
