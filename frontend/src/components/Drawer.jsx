import { useState } from "react";

export const Drawer = ({ children, isVisible, setIsVisible }) => {
    return (
        <div 
            className={`
                fixed top-0 left-0 w-screen h-screen z-50 
                ${isVisible ? "visible" : "hidden"}
            `}
        >
            <div
                className={`
                    fixed top-0 left-0 w-screen h-screen
                    bg-slate-900/50 backdrop-blur-sm
                `}
                onClick={() => setIsVisible(false)}
            >
            </div>
            <div 
                className={`
                    bg-white rounded-t-xl overflow-auto 
                    mx-auto max-w-4xl h-5/6 fixed left-0 bottom-0 right-0
                `}
            >
                {children}
            </div>
        </div>
    );
}