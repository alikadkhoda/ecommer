import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "../components/admin/Dashboard.js";
import Profile from "../components/admin/Profile.js";
import Login from "../components/frontend/auth/Login.js";
import Register from "../components/frontend/auth/Register.js";
import Home from "../components/frontend/Home.js";
import AdminPrivateRoute from "../AdminPrivateRoute.js";
import Page403 from "../components/errors/Page403.js";
import Page404 from "../components/errors/Page404.js";
import Category from "../components/admin/category/Category.js";
import ViewCategory from "../components/admin/category/ViewCategory.js";
import EditCategory from "../components/admin/category/EditCategory.js";
import AddProduct from "../components/admin/product/AddProduct.js";

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
            },
            {
                path: '/admin/add-category',
                element: <Category />
            },
            {
                path: '/admin/view-category',
                element: <ViewCategory />
            },
            {
                path: '/admin/edit-category/:id',
                element: <EditCategory />
            },
            {
                path: '/admin/add-product',
                element: <AddProduct />
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