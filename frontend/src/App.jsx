import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
    .then(res => res.json())
    .then(res => {
      setPosts(res.all_posts);
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <>
    {posts ? (posts.map(post => {
      return (
        <div key= {post}>
        <p>{post.title}</p>
        <span>{post.date}</span>
        <p>{post.body}</p>
        <ul>
        {post.comments.map(cmt => {
          return (
            <li key={cmt}>
              <p>{cmt.user.username}</p>
              <p>{cmt.body}</p>
              <span>{cmt.date}</span>
            </li>
          );
        })}
        </ul>
        </div>
      );
    })) : (<p>Loading...</p>)}
    </>
  );
}

export default App
