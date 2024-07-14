import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

const NewPost = () => {
    const [value, setValue] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(value);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Editor
                    id= "myEditor"
                    apiKey='4bgjuunumyvar6lgmxiqg9p9q90weh7llz2ciy1htrjxt5z9'
                    value={value}
                    onEditorChange={(newValue, editor) => setValue(newValue)}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic underline | bullist numlist outdent indent | code | image link ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default NewPost;