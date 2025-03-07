import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter , RouterProvider} from "react-router-dom";
import Home from './Routes/Home.jsx';
import PostList from './Routes/PostList.jsx';
import Write from './Routes/Write.jsx';
import LoginPage from './Routes/LoginPage.jsx';
import RegisterPage from './Routes/RegisterPage.jsx';
import { StrictMode } from 'react';
import SinglePost from './Routes/SinglePost.jsx';
import MainLayouts from './layouts/MainLayouts.jsx';
import { ClerkProvider } from "@clerk/clerk-react"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
    {
        element: <MainLayouts />,
        children: [
            {
                path: "/",
                element: 
                 <Home/>,
                
              },
              {
                path: "/posts",
                element: <PostList/>,
              },
              {
                path: "/:slug",
                element: <SinglePost/>,
              },
              {
                path: "/write",
                element: <Write/>,
              },
              {
                path: "/login",
                element: <LoginPage/>,
              },
              {
                path: "/register",
                element: <RegisterPage/>,
              },
        ]
   }
  ]);


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />

    </ClerkProvider>
  </StrictMode>


)
