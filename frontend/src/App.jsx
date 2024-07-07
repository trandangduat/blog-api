import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then(res => res.json())
      .then(res => setData(res.all_posts));
  }, []);

  return (
    <>
      <h1>Hello world</h1>
      {data && data.map((post) => {
        return (
          <>
            <div key = {post._id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </div>
          </>
        );
      })}
    </>
  )
}

export default App
