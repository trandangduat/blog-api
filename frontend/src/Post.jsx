import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { 
    ChatBubbleBottomCenterTextIcon, 
    HeartIcon, 
    Bars3BottomLeftIcon 
} from "@heroicons/react/24/outline";
import { Drawer } from "./components/Drawer";
import { convertMarkdownToHTML } from "./markdownUtils";

export const Post = () => {
    const { id: postId } = useParams();
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [date, setDate] = useState(null);
    const [drawerVisibility, setDrawerVisibility] = useState(false);

    const [commentsList, setCommentsList] = useState(null);
    const [commentValue, setCommentValue] = useState('');
    const [commentsRerender, setCommentsRerender] = useState(0);

    const { user } = useAuth();

    const showDrawer = (event) => {
        setDrawerVisibility(true);
    }
    
    useEffect(() => {
        fetch(`/api/post/${postId}`)
            .then(response => response.json())
            .then(response => {
                setTitle(response.title);
                setBody(convertMarkdownToHTML(response.body));
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
            <div className="flex justify-around">
                <div className="w-auto">
                    <aside className="flex flex-col gap-4 sticky top-32 text-slate-900">
                        <SidebarItem 
                            count={"TOC"}
                            icon={<Bars3BottomLeftIcon />}
                        />
                        <SidebarItem 
                            count={420}
                            icon={<HeartIcon />}
                        />
                        <SidebarItem 
                            count={commentsList ? commentsList.length : 0}
                            icon={<ChatBubbleBottomCenterTextIcon />}
                            onClick={showDrawer}
                        />
                    </aside>
                </div>
                <div className="flex-1 max-w-3xl">
                    <header className="mb-20">
                        <h1 className="leading-tight text-4xl font-serif font-text-slate-900 my-4">{title}</h1>
                        <div className="text-sm text-slate-700">
                            <span className="">{date}</span>
                        </div>
                    </header>
                    <article
                        className="prose prose-slate max-w-3xl prose-img:rounded-xl prose-h1:text-3xl"
                        dangerouslySetInnerHTML={{__html: body}}
                    />
                </div>
            </div>
            <Drawer
                isVisible={drawerVisibility}
                setIsVisible={setDrawerVisibility}
            >
                <CommentSection
                    commentsList={commentsList}
                    commentValue={commentValue}
                    setCommentValue={setCommentValue}
                    handleCommentSubmit={handleCommentSubmit}
                />
            </Drawer>
        </section>
    );
};

const CommentSection = ({ commentsList, commentValue, setCommentValue, handleCommentSubmit }) => {
    return (
        <div className="h-full flex flex-col">
            <h2 className="text-lg font-semibold p-4 border-b">Comments</h2>
            <div className="flex-1 overflow-y-auto px-6 py-4">
                {commentsList && (
                    <div className="space-y-4">
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
            <form onSubmit={handleCommentSubmit} className="border-t p-4">
                <div className="flex items-center">
                    <textarea 
                        placeholder="Add a comment..." 
                        value={commentValue}
                        onChange={(event) => {
                            setCommentValue(event.target.value);
                        }}
                        className="flex-1 resize-none rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-600"
                        rows="1"
                    />
                    <button 
                        type="submit" 
                        className="ml-2 bg-sky-400/10 text-sky-600 hover:bg-sky-400/20 rounded-lg px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}

const Comment = ({username, date, body}) => {
    return (
        <div className="flex space-x-3">
            <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="flex-1">
                <div className="text-sm">
                    <span className="font-semibold">{username}</span>
                    <span className="ml-2 text-gray-500">{date}</span>
                </div>
                <p className="mt-1 text-sm">{body}</p>
                <div className="mt-2 text-xs text-gray-500 space-x-4">
                    <button className="hover:text-gray-700">Reply</button>
                    <button className="hover:text-gray-700">Like</button>
                </div>
            </div>
        </div>
    );
}

const SidebarItem = ({ count, icon, onClick }) => {
    return (
        <div onClick={onClick} className="flex flex-col items-center text-md py-4 px-6 cursor-pointer rounded-2xl font-semibold bg-sky-400/10 text-sky-600 hover:bg-sky-400/20">
            {icon}
            <div className="mt-1">{count}</div>
        </div>
    );

}