import { Outlet } from "react-router-dom";
import './App.css'
import { NavBar } from "./components/Navbar";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="container max-w-5xl mx-auto pt-24">
        <Outlet />
      </div>
    </>
  );
}

export default App
