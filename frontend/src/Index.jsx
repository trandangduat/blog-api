import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noImageSrc from "./assets/no_image.png";

const shortenText = (text) => {
    const MAX_LENGTH = 200;
    if (text.length > MAX_LENGTH) {
        text = text.slice(0, MAX_LENGTH) + "...";
    }
    return text;
}

const sanitizeContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const firstImage = doc.body.querySelector('img');
    return {
        text: shortenText(doc.body.textContent) || "",
        image: (firstImage ? firstImage.src : noImageSrc)
    };
}

export const Index = () => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => {
                const { all_posts } = data;
                all_posts.map((post) => {
                    const { text, image } = sanitizeContent(post.body);
                    post.body = text;
                    post.previewImage = image;
                    post.commentsCount = post.comments.length;
                });
                setPosts(all_posts.reverse());
            });
    }, []);

    return (
        <>
            {posts && (
                <div className="flex flex-col space-y-10">
                    {posts.map((post) => (
                        <PostCard 
                            key={post.date}
                            title={post.title}
                            date={post.date}
                            previewBody={post.body}
                            previewImage={post.previewImage}
                            url={`/post/${post._id}`}
                            commentsCount={post.commentsCount}
                        ></PostCard>
                    ))}
                </div>
            )}
        </>
    );
}

const PostCard = ({ title, date, previewBody, previewImage, url, commentsCount }) => {
    return (
        <div className="flex space-x-6 border border-slate-200 rounded-md p-5">
            <div className="bg-slate-100 border border-slate-200 rounded-md flex-none overflow-hidden w-52 h-52">
                <img 
                    src={previewImage} 
                    alt={title}
                    className="object-center object-cover mx-auto"
                ></img>
            </div>
            <div className="p-4">
                <header className="text-sm">
                    <span className="text-slate-700">
                        {date}
                    </span>
                </header>
                <section>
                    <h1 className="font-bold text-slate-900 my-4 hover:text-slate-700">
                        <Link to={url}>{title}</Link>
                    </h1>
                    <p className="text-sm text-wrap text-slate-700 mb-4">
                        {previewBody}
                    </p>
                </section>
                <footer className="text-slate-700">
                    <div className="">{commentsCount} comments</div>
                </footer>
            </div>
        </div>
    );

}