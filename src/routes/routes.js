import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "../components/admin/Dashboard.js";
import Login from "../components/frontend/auth/Login.js";
import Register from "../components/frontend/auth/Register.js";
import AdminPrivateRoute from "../AdminPrivateRoute.js";
import Page403 from "../components/errors/Page403.js";
import Page404 from "../components/errors/Page404.js";
import Category from "../components/admin/category/Category.js";
import ViewCategory from "../components/admin/category/ViewCategory.js";
import EditCategory from "../components/admin/category/EditCategory.js";
import AddProduct from "../components/admin/product/AddProduct.js";
import ViewProduct from "../components/admin/product/ViewProduct.js";
import EditProduct from "../components/admin/product/EditProduct.js";
import About from "../components/frontend/About.js";
import Contact from "../components/frontend/Contact.js";
import FrontendLayout from "../layouts/frontend/FrontendLayout.js";
import ViewCategoryFront from "../components/frontend/collections/ViewCategoryFront";
import ViewProductFront from "../components/frontend/collections/ViewProductFront.js";
import ProductDetail from "../components/frontend/collections/ProductDetail.js";
import Cart from "../components/frontend/Cart.js";
import Checkout from "../components/frontend/Checkout.js";
import Order from "../components/admin/order/Order.js";
import User from "../components/admin/user/User.js";
import EditUser from "../components/admin/user/EditUser.js";
import OrderDetail from "../components/admin/order/OrderDetail.js";
import Profile from "../components/frontend/profile/Profile";
import EditProfile from "../components/frontend/profile/EditProfile.js";
import Home from "../components/frontend/home/Home.js";
import AdminContextProvider from "../context/AdminContext.js";


const routes = createBrowserRouter([
    {
        path: '/admin',
        element:<AdminContextProvider><AdminPrivateRoute/></AdminContextProvider> ,
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
            },
            {
                path: '/admin/view-product',
                element: <ViewProduct />
            },
            {
                path: '/admin/edit-product/:id',
                element: <EditProduct />
            },
            {
                path: '/admin/orders',
                element: <Order />
            },
            {
                path: '/admin/view-order/:id',
                element: <OrderDetail />
            },
            {
                path: '/admin/view-users',
                element: <User />
            },
            {
                path: '/admin/edit-user/:id',
                element: <EditUser />
            },

        ]
    },
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
            {
                path: '/login',
                element:localStorage.getItem('auth_token')?<Navigate to={'/'}/>: <Login />
            },
            {
                path: '/register',
                element: localStorage.getItem('auth_token')?<Navigate to={'/'}/>: <Register />
            },
            {
                path: '/profile',
                element: localStorage.getItem('auth_token')? <Profile /> : <Navigate to={'/'}/>
            },
            {
                path: '/edit-profile',
                element: localStorage.getItem('auth_token')? <EditProfile /> : <Navigate to={'/'}/>
            },
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/about',
                element:<About/>
            },
            {
                path:'/contact',
                element:<Contact/>
            },
            {
                path:'/collections',
                element:<ViewCategoryFront/>
            },
            {
                path:'/collections/:slug',
                element:<ViewProductFront/>
            },
            {
                path:'/collections/:category_slug/:product_slug',
                element:<ProductDetail/>
            },
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path:'/checkout',
                element:<Checkout/>
            },

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