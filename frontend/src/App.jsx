import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css'

function App() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetch("/api/posts")
    .then(res => {
      if (res.status == 401) {
        console.log(res.statusText);
        setPosts([]);
        return;
      }
      return res.json()
    })
    .then(res => {
      setPosts(res.all_posts);
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <>
    <Link to="login">Login</Link>
    <Link to="signup">Sign up</Link>
    {posts ? (posts.map(post => {
      return (
        <div key= {post}>
        <p>{post.title}</p>
        <span>{post.date}</span>
        <p>{post.body}</p>
        <Link to={post.url}>Read more...</Link>
        </div>
      );
    })) : (<p>Loading...</p>)}
    </>
  );
}

export default App
