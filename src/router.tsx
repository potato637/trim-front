import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "./pages/home";
import Error from "./pages/error";
import Questiontab from "./pages/questiontab";
import Sharetab from "./pages/sharetab";
import Communitytab from "./pages/communitytab";
import Surveytab from "./pages/surveytab";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "question", element: <Questiontab /> },
      { path: "share", element: <Sharetab /> },
      { path: "community", element: <Communitytab /> },
      { path: "survey", element: <Surveytab /> },
    ],
    errorElement: <Error />,
  },
]);

export default router;
