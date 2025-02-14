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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "", element: <Home /> },
      { path: "question", element: <Questiontab /> },
      { path: "question/:itemId", element: <Question /> },
      { path: "question/new", element: <Questionnew /> },
      { path: "share", element: <Sharetab /> },
      { path: "share/:itemId", element: <Share /> },
      { path: "share/new", element: <Sharenew /> },
      { path: "community", element: <Communitytab /> },
      { path: "community/:itemId", element: <Community /> },
      { path: "community/new", element: <Communitynew /> },
      { path: "survey", element: <Surveytab /> },
      { path: "survey/:itemId", element: <Survey /> },
      { path: "survey/new", element: <Surveynew /> },
      { path: "mypage", element: <Mypage /> },
    ],
    errorElement: <Error />,
  },
]);

export default router;
