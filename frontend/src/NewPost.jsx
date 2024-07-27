import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { marked } from 'marked';

const NewPost = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [preview, setPreview] = useState('');
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
            .then(response => {
                console.log(response);
                return navigate('/');
            });
    };

    const handleContentChange = (event) => {
        const content = event.target.value;
        setValue(content);
        setPreview(marked.parse(content));
    };

    return (
        <div className="flex flex-row h-screen w-screen text-slate-900 overflow-hidden">
            <form className="flex flex-col w-1/2 p-4" onSubmit={handleSubmit}>
                <label htmlFor="post-title" className="block">Title:</label>
                <input 
                    className="w-full border border-slate-400 rounded-lg p-2 mb-4"
                    type="text" 
                    name="post-title" 
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
                <textarea 
                    className="flex-1 border border-slate-400 rounded-lg overflow-auto p-4 resize-none"
                    value={value}
                    onChange={handleContentChange}
                />
                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-lg">Submit</button>
            </form>
            <section className="w-1/2 p-4">
                <article
                    className="max-w-none h-full w-full overflow-auto border border-slate-400 rounded-lg px-10 py-4 prose prose-slate"
                    dangerouslySetInnerHTML={{__html: preview}}
                />
            </section>
        </div>
    );
};

export default NewPost;