import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const [date, setDate] = useState("");
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setDate(formatDate(post.$updatedAt));
                
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    function formatDate(isoDate) {
        const date = new Date(isoDate);
      
        const options = {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };
      
        return date.toLocaleDateString('en-US', options);   
      
      }
    return post ? (
        <div className="flex justify-center min-h-screen w-full bg-[#eeeeee]">
            {/* Main Content */}
            <main className="md:w-3/4 w-full p-10">
                <Container>
                    {/* Author and Title Section */}
                    <div className="flex items-center mb-4">
                        <img
                            src="/images/userlogo.png"
                            alt="Author Avatar"
                            className="md:w-10 md:h-10 w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-800">Joana Marie Jones</p>
                            <p className="text-xs text-gray-500">{date}</p>
                        </div>
                    </div>

                    {/* Post Title */}
                    <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-6">{post.title}</h1>

                    {/* Post Image */}
                    <div className="relative mb-8 flex justify-center">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg shadow-lg max-w-full"
                        />
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgcolor="bg-green-500" className="text-white">Edit</Button>
                                </Link>
                                <Button bgcolor="bg-red-500" className="text-white" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Post Content */}
                    <div className="prose max-w-none font-light text-gray-800 m-auto w-4/5">
                        {parse(post.content)}
                    </div>
                </Container>
            </main>
        </div>
    ) : null;
}
