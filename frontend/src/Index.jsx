import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import noImageSrc from "./assets/no_image.png";
import { ChatBubbleBottomCenterTextIcon, HeartIcon } from "@heroicons/react/24/outline"
import dayjs from "dayjs"
import { LightBall } from "./components/LightBall";
import { useMouseTracker } from "./App";

const shortenText = (text) => {
    const MAX_LENGTH = 300;
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
                    post.formattedDate = dayjs(post.date).format("MMM DD, YYYY");
                });
                setPosts(all_posts.reverse());
            });
    }, []);

    return (
        <>
            {posts && (
                <div className="flex flex-col gap-8">
                    {posts.map((post) => (
                        <PostCard
                            key={post.date}
                            title={post.title}
                            date={post.formattedDate}
                            previewBody={post.body}
                            previewImage={post.previewImage}
                            url={`/post/${post._id}`}
                            commentsCount={post.commentsCount}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

const PostCard = ({ title, date, previewBody, previewImage, url, commentsCount }) => {
    const cardRef = useRef(null);
    const mousePos = useMouseTracker();
    const {x: cardX, y: cardY} = (cardRef.current ? cardRef.current.getBoundingClientRect() : {x: 0, y: 0});

    return (
        <div ref={cardRef} className="flex gap-6 overflow-hidden border bg-white/50 dark:bg-slate-800/20 dark:hover:bg-slate-700/20 transition-colors duration-500 backdrop-blur-3xl border-slate-200 dark:border-slate-50/10 rounded-lg p-5">
            <LightBall size="w-64" x={mousePos.x - cardX} y={mousePos.y - cardY} />
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-50/[0.06] rounded-md flex-none overflow-hidden w-52 h-52">
                <img
                    src={previewImage}
                    alt={title}
                    className="object-center object-cover mx-auto"
                ></img>
            </div>
            <div className="p-4">
                <header className="text-sm">
                    <span className="text-slate-700 dark:text-slate-400">
                        {date}
                    </span>
                </header>
                <section>
                    <h1 className="font-bold text-xl text-slate-900 dark:text-slate-200 my-4 hover:text-slate-700 dark:hover:text-slate-50">
                        <Link to={url}>{title}</Link>
                    </h1>
                    <p className="text-sm text-wrap text-slate-700 dark:text-slate-400 mb-4">
                        {previewBody}
                    </p>
                </section>
                <footer className="flex gap-3">
                    <PostStatistic
                        icon={<HeartIcon />}
                        count={420}
                    />
                    <PostStatistic
                        icon={<ChatBubbleBottomCenterTextIcon />}
                        count={commentsCount}
                    />
                </footer>
            </div>
        </div>
    );
}

const PostStatistic = ({ icon, count }) => {
    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-300  bg-slate-200/50 dark:bg-gradient-to-tl from-slate-900 to-slate-800">
            <span className="size-4">{icon}</span>
            <div className="">{count}</div>
        </div>
    );

}
