import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const stripHTMLTags = (text) => {
    return text.replace(/<[^>]*>/g, '');
}

export const Index = () => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(response => {
                const { all_posts } = response;
                all_posts.map((post) => {
                    post.body = stripHTMLTags(post.body);
                    const LIMIT_LENGTH = 200;
                    if (post.body.length > LIMIT_LENGTH) {
                        post.body = post.body.slice(0, LIMIT_LENGTH) + "...";
                    }
                })
                setPosts(all_posts.reverse());
            });
    }, []);
    return (
        <>
            {posts && (
                <div>
                    {posts.map((post) => (
                        <div key={post._id}>
                            <h1>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h1>
                            <span>{post.date}</span>
                            <p 
                                dangerouslySetInnerHTML={{__html: post.body}}
                                className="preview"
                            >
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}