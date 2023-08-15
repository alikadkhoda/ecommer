import React from "react";
import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import MasterLayout from "../layouts/admin/MasterLayout.js";
import Dashboard from "../components/admin/Dashboard.js";
import Profile from "../components/admin/Profile.js";

const routes = createBrowserRouter([
    {
        path:'/admin',
        element:<MasterLayout/>,
        children: [
            {
                path:'/admin/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/admin/profile',
                element:<Profile/>
            }
           
        ]
    }
    
])

export default routes;