import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MasterLayout from "../layouts/admin/MasterLayout.js";
import Dashboard from "../components/admin/Dashboard.js";
import Profile from "../components/admin/Profile.js";
import Login from "../components/frontend/auth/Login.js";
import Register from "../components/frontend/auth/Register.js";
import Home from "../components/frontend/Home.js";
import AdminPrivateRoute from "../AdminPrivateRoute.js";
import Page403 from "../components/admin/errors/Page403.js";
import Page404 from "../components/admin/errors/Page404.js";

const routes = createBrowserRouter([
    {
        path: '/admin',
        element: <AdminPrivateRoute/>,
        children: [
            {
                path: '/admin/dashboard',
                element: <Dashboard />
            },
            {
                path: '/admin/profile',
                element: <Profile />
            }

        ]
    },
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/login',
                element:localStorage.getItem('auth_token')?<Navigate to={'/'}/>: <Login />
            },
            {
                path: '/register',
                element: localStorage.getItem('auth_token')?<Navigate to={'/'}/>: <Register />
            }

        ]
    },
    {
        path:'/403',
        element:<Page403/>
    },
    {
        path:'/404',
        element:<Page404/>
    }
    


])

export default routes;