import { Outlet } from "react-router-dom";
import './App.css'
import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { createContext, useContext, useState } from "react";

const MouseTrackerContext = createContext(null);

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <MouseTrackerContext.Provider value={mousePos}>
        <NavBar />
        <div className="container max-w-5xl mx-auto pt-24">
          <Outlet />
        </div>
        <Footer />
      </MouseTrackerContext.Provider>
    </div>
  );
}

export const useMouseTracker = () => (useContext(MouseTrackerContext) || { x: 0, y: 0 });

export default App
