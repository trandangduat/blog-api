import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";

export const Popup = ({ children, isVisible }) => {
    const [popupAnimation, api] = useSpring(() => ({
        from: { 
            width: "0",
            height: "0",
            opacity: 0,
        },
        config: { mass: 1, tension: 200, friction: 20 }
    }));

    useEffect(() => {
        if (isVisible) {
            api.start({
                width: "28rem",
                height: "28rem",
                opacity: 1,
            });
        } else {
            api.start({
                width: "0",
                height: "0",
                opacity: 0,
            });
        }
    }, [isVisible, api]);

    return (
        <div 
            className={`
                absolute top-0 left-32 z-50 
                ${isVisible ? "pointer-events-auto" : "pointer-events-none"}
            `}
        >
            <animated.div 
                className={`
                    bg-white/75 border-2 border-slate-200 backdrop-blur-md rounded-xl
                    overflow-auto max-w-md
                `}
                style={{
                    ...popupAnimation,
                }}
            >
                <div className="py-6 px-8 w-full">
                    {children}
                </div>
            </animated.div>
        </div>
    );
}