import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { 
    ChatBubbleBottomCenterTextIcon, 
    HeartIcon, 
    Bars3BottomLeftIcon 
} from "@heroicons/react/24/outline";
import { marked } from "marked";

export const Post = () => {
    const { id: postId } = useParams();
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [date, setDate] = useState(null);

    const [commentsList, setCommentsList] = useState(null);
    const [commentValue, setCommentValue] = useState('');
    const [commentsRerender, setCommentsRerender] = useState(0);

    const { user } = useAuth();
    
    useEffect(() => {
        fetch(`/api/post/${postId}`)
            .then(response => response.json())
            .then(response => {
                setTitle(response.title);
                setBody(marked.parse(response.body));
                setDate(response.date);
            })
    }, [postId]);

    useEffect(() => {
        fetch(`/api/post/${postId}/comments`)
            .then(response => response.json())
            .then(response => {
                setCommentsList(response.comments.reverse());
            })
    }, [postId, commentsRerender]);

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user._id,
                commentBody: commentValue,
            })
        }
        fetch(`/api/post/${postId}/comment/create`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setCommentValue('');
                setCommentsRerender(prev => prev + 1);
            });
    };

    return (
        <section className="">
            <header className="mb-20 text-center">
                <h1 className="text-5xl font-serif font-semibold text-slate-900 my-4">{title}</h1>
                <div className="text-sm text-slate-700">
                    <span className="">{date}</span>
                </div>
            </header>
            
            <div className="flex justify-between gap-6">
                <div className="flex-1">
                    <article
                        className="prose prose-slate max-w-3xl"
                        dangerouslySetInnerHTML={{__html: body}}
                    />
                </div>
                <div className="w-auto">
                    <aside className="flex flex-col gap-4 sticky top-1/4 text-slate-900">
                        <SidebarItem 
                            count={"TOC"}
                            icon={<Bars3BottomLeftIcon className="size-8" />}
                        />
                        <SidebarItem 
                            count={420}
                            icon={<HeartIcon className="size-8" />}
                        />
                        <SidebarItem 
                            count={commentsList ? commentsList.length : 0}
                            icon={<ChatBubbleBottomCenterTextIcon className="size-8" />}
                        />
                    </aside>
                </div>
            </div>

            <footer className="hidden">
                <div>
                    <form onSubmit={handleCommentSubmit} className="mb-10">
                        <textarea 
                            placeholder="Your comment here..." 
                            value={commentValue}
                            onChange={(event) => setCommentValue(event.target.value)}
                        />
                        <button type="submit">Sent</button>
                    </form>

                    {commentsList && (
                        <div className="space-y-6 text-slate-900">
                            {commentsList.map((cmt) => (
                                <Comment 
                                    key={cmt.date}
                                    username={cmt.user.username}
                                    date={cmt.date}
                                    body={cmt.body}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </footer>
        </section>
    );
};

const Comment = ({username, date, body}) => {
    return (
        <div className="">
            <header className="flex gap-3 items-center">
                <p className="font-semibold">{username}</p>
                <p className="text-sm text-slate-700">{date}</p>
            </header>
            <div className="">
                <p className="text-base">{body}</p>
            </div>
            <footer>

            </footer>
        </div>
    );
}

const SidebarItem = ({ count, icon }) => {
    return (
        <div className="flex flex-col items-center text-lg py-4 px-6 rounded-2xl bg-slate-200/50">
            {icon}
            <div className="">{count}</div>
        </div>
    );

}