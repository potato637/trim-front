import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "./pages/home";
import Error from "./pages/error";
import Questiontab from "./pages/questiontab";
import Sharetab from "./pages/sharetab";
import Communitytab from "./pages/communitytab";
import Surveytab from "./pages/surveytab";
import Mypage from "./pages/mypage";
import Question from "./pages/question";
import Share from "./pages/share";
import Community from "./pages/community";
import Survey from "./pages/survey";
import Questionnew from "./pages/questionnew";
import Sharenew from "./pages/sharenew";
import Communitynew from "./pages/communitynew";
import Surveynew from "./pages/surveynew";
import Redirection from "./pages/redirection";
import Signin from "./pages/signin";

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
      { path: "survey", element: <Surveytab /> },
      { path: "survey/:itemId", element: <Survey /> },
      { path: "survey/new", element: <Surveynew /> },
      { path: "mypage", element: <Mypage /> },
      { path: "oauth/:provider/callback", element: <Redirection /> },
      { path: "signin", element: <Signin /> },
    ],
    errorElement: <Error />,
  },
]);

export default router;
