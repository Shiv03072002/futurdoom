import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import PlainLayout from "./layouts/PlainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Chatbotmain from "./pages/Chatbotmain";
import UserProfilePage from "./pages/UserProfilePage";
import ChatMain from "./pages/ChatMain";
import MyProfile from "./pages/MyProfile";
import Setting from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import Share from "./pages/Share";
import Notification from "./pages/Notification";
import DiscussionMain from "./pages/discussion/Discussion";
import DiscussionChatMain from "./pages/discussion/DiscussionChatMain";
import Groups from "./pages/groups/Groups";
import GroupChat from "./pages/groups/GroupChatMain";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import LoginPage from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/ResetPassword";
import AIChat from "./pages/AIChat";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "login", element: <LoginPage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <SignIn /> },
  { path: '/reset-password', element: <ResetPassword /> },
  {
    path: "/",
    element: <PlainLayout />,
    children: [
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "chatbotmain", element: <Chatbotmain /> },
      { path: "discussion", element: <DiscussionMain /> },
      { path: "discussion/:discussionId", element: <DiscussionChatMain /> },
      { path: "discussion/new", element: <DiscussionChatMain /> },
      { path: "groups", element: <Groups /> },
      { path: "group-chat/:groupId", element: <GroupChat /> },
      { path: "group-chat/new", element: <GroupChat /> },
      { path: "terms", element: <Terms /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "disclaimer", element: <Disclaimer /> },
     
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "profile/:username", element: <UserProfilePage /> },
      { path: "searchpeople", element: <Search /> },
      { path: "chat", element: <ChatMain /> },
      { path: "profile", element: <MyProfile /> },
      { path: "settings", element: <Setting /> },
      { path: "edit", element: <EditProfile /> },
      { path: "share", element: <Share /> },
      { path: "notification", element: <Notification /> },
       {path:"deepaskshare", element:<AIChat />}
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
