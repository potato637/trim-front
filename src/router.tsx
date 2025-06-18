import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "./pages/home";
import Error from "./pages/error";
import Questiontab from "./pages/questiontab";
import Sharetab from "./pages/sharetab";
import Communitytab from "./pages/communitytab";
import Question from "./pages/question";
import Share from "./pages/share";
import Community from "./pages/community";
import Questionnew from "./pages/questionnew";
import Sharenew from "./pages/sharenew";
import Communitynew from "./pages/communitynew";
import Redirection from "./pages/redirection";
import Signin from "./pages/signin";
import Profile from "./pages/profile";
import Badges from "./pages/badges";
import History from "./pages/history";
import Editavatar from "./pages/editavatar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "question", element: <Questiontab /> },
      { path: "question/:itemId", element: <Question /> },
      { path: "question/new", element: <Questionnew /> },
      { path: "knowledge", element: <Sharetab /> },
      { path: "knowledge/:itemId", element: <Share /> },
      { path: "knowledge/new", element: <Sharenew /> },
      { path: "community", element: <Communitytab /> },
      { path: "community/:itemId", element: <Community /> },
      { path: "community/new", element: <Communitynew /> },
      { path: "oauth/:provider/callback", element: <Redirection /> },
      { path: "signin", element: <Signin /> },
      { path: "profile", element: <Profile /> },
      { path: "badges", element: <Badges /> },
      { path: "history", element: <History /> },
      { path: "edit-avatar", element: <Editavatar /> },
    ],
    errorElement: <Error />,
  },
]);

export default router;
