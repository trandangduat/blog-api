import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { 
    ChatBubbleBottomCenterTextIcon, 
    HeartIcon, 
    Bars3BottomLeftIcon 
} from "@heroicons/react/24/outline";
import { Drawer } from "./components/Drawer";
import { convertMarkdownToHTML, exportHeadingsFromMarkdown } from "./markdownUtils";
import { Popup } from "./components/Popup";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const Post = () => {
    const { id: postId } = useParams();
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [date, setDate] = useState(null);
    const [drawerVisibility, setDrawerVisibility] = useState(false);

    const [commentsList, setCommentsList] = useState(null);
    const [commentValue, setCommentValue] = useState('');
    const [commentsRerender, setCommentsRerender] = useState(0);

    const [headings, setHeadings] = useState(null);
    const [TOCPopupVisibility, setTOCPopupVisibility] = useState(false);

    const { user } = useAuth();

    const showDrawer = (event) => {
        setDrawerVisibility(true);
    }

    const toggleTOCPopup = (event) => {
        setTOCPopupVisibility(state => !state);
    }
    
    useEffect(() => {
        fetch(`/api/post/${postId}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                data.date = dayjs(data.date).format("MMM DD, YYYY");
                setDate(data.date);
                setBody(convertMarkdownToHTML(data.body));
                setHeadings(exportHeadingsFromMarkdown(data.body));
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
                <div className="w-auto z-10">
                    <aside className="flex flex-col gap-4 sticky top-32 text-slate-900">
                        <SidebarItem 
                            count={"TOC"}
                            icon={<Bars3BottomLeftIcon />}
                            onClick={toggleTOCPopup}
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
                        <Popup
                            isVisible={TOCPopupVisibility}
                            setIsVisible={setTOCPopupVisibility}
                        >
                            <TableOfContent
                                headings={headings}
                                setTOCPopupVisibility={setTOCPopupVisibility}
                            />
                        </Popup>
                    </aside>
                </div>
                <div className="flex-1 max-w-3xl z-0">
                    <header className="mb-20">
                        <h1 className="leading-tight text-4xl font-serif text-slate-900 dark:text-slate-200 my-4">{title}</h1>
                        <div className="text-sm text-slate-700 dark:text-slate-400">
                            <span className="">{date}</span>
                        </div>
                    </header>
                    <article
                        className="prose prose-slate dark:prose-invert max-w-3xl prose-img:rounded-xl prose-h1:text-3xl"
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

const TableOfContent = ({ headings, setTOCPopupVisibility }) => {
    return (
        <div className="overflow-hidden">
            <div className="flex flex-col">
                {headings && (
                    <>
                        {headings.map(heading => (
                            <TOCHeading
                                key={heading.url}
                                heading={heading}
                                setTOCPopupVisibility={setTOCPopupVisibility}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

const TOCHeading = ({ heading, setTOCPopupVisibility }) => {
    const marginClasses = [
        'ml-0',
        'ml-8',
        'ml-12',
    ];
    return (
        <a 
            href={heading.url}
            onClick={() => setTOCPopupVisibility(false)}
        >
            <span 
                className={`
                    block 
                    font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100
                    px-4 py-1
                    ${heading.depth == 1 ? "" : "border-l-2 border-l-slate-200 dark:border-l-slate-50/[0.1]"}
                    ${marginClasses[heading.depth - 1]}
                `}
            >
                {heading.text}
            </span>
        </a>
    );
}

const CommentSection = ({ commentsList, commentValue, setCommentValue, handleCommentSubmit }) => {
    return (
        <div className="h-full flex flex-col dark:text-slate-200">
            <h2 className="text-lg font-semibold p-4 border-b dark:border-slate-50/[0.06]">Comments</h2>
            <div className="flex-1 overflow-y-auto px-6 py-4">
                {commentsList && (
                    <div className="space-y-4">
                        {commentsList.map((cmt) => (
                            <Comment 
                                key={cmt.date}
                                username={cmt.user.username}
                                date={dayjs(cmt.date).fromNow()}
                                body={cmt.body}
                            />
                        ))}
                    </div>
                )}
            </div>
            <form onSubmit={handleCommentSubmit} className="border-t p-4 dark:border-slate-50/[0.06]">
                <div className="flex items-center">
                    <textarea 
                        placeholder="Add a comment..." 
                        value={commentValue}
                        onChange={(event) => {
                            setCommentValue(event.target.value);
                        }}
                        className="flex-1 resize-none rounded-lg py-2 px-4 focus:outline-none dark:bg-slate-800 focus:ring-2 focus:ring-sky-600 dark:focus:ring-sky-400"
                        rows="1"
                    />
                    <button 
                        type="submit" 
                        className="ml-2 bg-sky-400/10 text-sky-600 dark:text-sky-400 hover:bg-sky-400/20 rounded-lg px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400"
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
                <div className="w-8 h-8 bg-gray-300 dark:bg-slate-700 rounded-lg"></div>
            </div>
            <div className="flex-1">
                <div className="text-sm">
                    <span className="font-semibold">{username}</span>
                    <span className="ml-2 text-slate-500">{date}</span>
                </div>
                <p className="mt-1 text-sm">{body}</p>
                <div className="mt-2 text-xs text-slate-500 space-x-4">
                    <button className="hover:text-slate-700 dark:hover:text-slate-300">Reply</button>
                    <button className="hover:text-slate-700 dark:hover:text-slate-300">Like</button>
                </div>
            </div>
        </div>
    );
}

const SidebarItem = ({ count, icon, onClick }) => {
    return (
        <div onClick={onClick} className="flex flex-col items-center text-md py-4 px-6 cursor-pointer rounded-2xl font-semibold bg-sky-400/10 text-sky-600 dark:text-sky-400 hover:bg-sky-400/20">
            {icon}
            <div className="mt-1">{count}</div>
        </div>
    );

}