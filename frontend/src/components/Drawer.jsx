import { useSpring, animated } from "@react-spring/web"
import { useEffect } from "react";

export const Drawer = ({ children, isVisible, setIsVisible }) => {
    const [drawerAnimation, drawer] = useSpring(() => ({
        from: { bottom: "-100%" },
    }));
    const [backdropAnimation, backdrop] = useSpring(() => ({
        from: { opacity: "0" },
    }));

    useEffect(() => {
        if (isVisible) {
            backdrop.start({
                from: { opacity: "0" },
                to: { opacity: "1" },
            });
            drawer.start({
                from: { bottom: "-100%" },
                to: { bottom: "0" },
            });
        }
    }, [isVisible, drawer, backdrop]);

    const closeDrawer = () => {
        drawer.start({
            from: { bottom: "0" },
            to: { bottom: "-100%" },
        });
        backdrop.start({
            from: { opacity: "1" },
            to: { opacity: "0" },
        });
        setTimeout(() => setIsVisible(false), 300);
    };

    return (
        <div 
            className={`
                fixed top-0 left-0 w-screen h-screen z-50 
                ${isVisible ? "visible" : "hidden"}
            `}
        >
            <animated.div
                className={`
                    fixed top-0 left-0 w-screen h-screen
                    bg-slate-900/50 backdrop-blur-sm
                `}
                onClick={closeDrawer}
                style={{
                    ...backdropAnimation,
                }}
            >
            </animated.div>
            <animated.div 
                className={`
                    bg-white dark:bg-slate-800 rounded-t-xl overflow-auto 
                    mx-auto max-w-4xl h-5/6 fixed left-0 right-0
                `}
                style={{
                    ...drawerAnimation,
                }}
            >
                {children}
            </animated.div>
        </div>
    );
}