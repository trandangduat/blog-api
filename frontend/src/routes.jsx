import App from "./App"
import DefaultProfile from "./DefaultProfile";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import SignUp from "./SignUp";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/post/:id",
    element: <DefaultProfile />
  }
];

export default routes;