import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "./pages/home";
import Error from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "", element: <Home /> }, { path: "" }],
    errorElement: <Error />,
  },
]);

export default router;
