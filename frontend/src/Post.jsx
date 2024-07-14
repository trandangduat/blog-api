import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Post = () => {
    const { id: postId } = useParams();
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [date, setDate] = useState(null);
    
    useEffect(() => {
        fetch(`/api/post/${postId}`)
            .then(response => response.json())
            .then(response => {
                setTitle(response.title);
                setBody(response.body);
                setDate(response.date);
            })
    }, [postId])

    return (
        <>
            <h1>{title}</h1>
            <span>{date}</span>
            <div 
                dangerouslySetInnerHTML={{__html: body}}
            ></div>
        </>
    );
};