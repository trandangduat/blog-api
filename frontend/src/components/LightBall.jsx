export const LightBall = ({ x, y }) => {
    return (
        <>
            <div 
                style={{top: y, left: x}} 
                className={`pointer-events-none blur-3xl absolute -z-10 w-96 aspect-square -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-slate-800/20 to-slate-700/30 rounded-full `}>
            </div>
        </>
    );
};
