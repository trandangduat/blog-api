
export const Popup = ({ children }) => {
    return (
        <div className={`
            absolute top-0 left-40 z-50
            bg-white/75 border-2 border-slate-200 backdrop-blur-xl py-6 px-8 rounded-xl
            max-w-md w-max
        `}>
            {children}
        </div>
    );
}