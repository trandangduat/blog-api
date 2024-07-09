import App from "./App"
import ErrorPage from "./ErrorPage"
import Test from "./Test";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "test",
    element: <Test />,
  },
];

export default routes;