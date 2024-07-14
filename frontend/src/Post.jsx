import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Post = () => {
    const { id: postId } = useParams();
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [date, setDate] = useState(null);

    const [commentsList, setCommentsList] = useState(null);
    const [commentValue, setCommentValue] = useState('');
    
    useEffect(() => {
        fetch(`/api/post/${postId}`)
            .then(response => response.json())
            .then(response => {
                setTitle(response.title);
                setBody(response.body);
                setDate(response.date);
            })
    }, [postId]);

    useEffect(() => {
        fetch(`/api/post/${postId}/comments`)
            .then(response => response.json())
            .then(response => {
                setCommentsList(response.comments);
            })
    }, [postId]);

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/post/${postId}/comment/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: '668e2e603a400204c3c11ae3',
                commentBody: commentValue,
            })
        })
            .then(response => response.json())
            .then(response => console.log(response));
        setCommentValue('');
    };

    return (
        <>
            <h1>{title}</h1>
            <hr></hr>

            <span>{date}</span>
            <div 
                dangerouslySetInnerHTML={{__html: body}}
            ></div>
            <hr></hr>

            <div id="comment-section">
                <form onSubmit={handleCommentSubmit}>
                    <textarea 
                        placeholder="Your comment here..." 
                        value={commentValue}
                        onChange={(event) => setCommentValue(event.target.value)}
                        style={{
                            width:"100%", 
                            height:"100px",
                            fontSize: "16px",
                            resize: "vertical",
                        }}
                    ></textarea>
                    <button type="submit">Sent</button>
                </form>

                {commentsList && (
                    <div>
                        {commentsList.map((cmt) => (
                            <div key={cmt}>
                                <p>{cmt.user.username}</p>
                                <p>{cmt.date}</p>
                                <p>{cmt.body}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    );
};