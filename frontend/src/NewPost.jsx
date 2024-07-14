import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/post/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                body: value
            })
        })
            .then(response => response.json())
            .then(response => console.log(response));
        navigate('/');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="post-title">Title:</label>
                <input 
                    type="text" 
                    name="post-title" 
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                ></input>
                <Editor
                    apiKey='4bgjuunumyvar6lgmxiqg9p9q90weh7llz2ciy1htrjxt5z9'
                    value={value}
                    onEditorChange={(newValue, editor) => setValue(newValue)}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic underline | bullist numlist outdent indent | image link ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default NewPost;