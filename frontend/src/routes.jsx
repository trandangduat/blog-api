import { createRoutesFromElements, Route } from "react-router-dom";
import App from "./App"
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./AuthContext";
import { Logout } from "./Logout";
import NewPost from "./NewPost";

const routes = createRoutesFromElements(
  <Route element={<AuthProvider />}>
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route 
        path="login"
        element={<Login />}
      />
      <Route
        path="signup"
        element={<SignUp />}
      />
      <Route
        path="logout"
        element={<Logout />}
      />
      <Route
        path="post/newpost"
        element={<NewPost />}
      />
    </Route>
  </Route>
);

export default routes;