import React from 'react'
import ReactDOM from 'react-dom/client'
import Customer from './Customer.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup";
import AuthProvider from "./components/context/AuthContext.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Home from "./layouts/dashboard/Dashboard.jsx";
import Calendar from './layouts/calendar/Calendar.jsx'

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><Home /></ProtectedRoute>
    },
    {
        path: "/customers",
        element: <ProtectedRoute><Customer /></ProtectedRoute>
    },
    {
        path: "/calendar",
        element: <ProtectedRoute><Calendar /></ProtectedRoute>
    }
])

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <ChakraProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
                <ToastContainer />
            </ChakraProvider>
        </React.StrictMode>,
    )
