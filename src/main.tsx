import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthPage from "./pages/AuthPage.tsx";
import {mainLoader} from "./loader/mainLoader.ts";
import MainPage from "./pages/MainPage.tsx";
import LoginForm from "./components/Auth/LoginForm.tsx";
import RegisterForm from "./components/Auth/RegisterForm.tsx";
import {coreStore} from "./Store/store.ts"
import {Provider} from "react-redux";
import Loader from "./components/UI/Loader.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import {authLoader} from "./loader/authLoader.ts";
import Transactions from "./pages/Transactions.tsx";
import Goals from "./pages/Goals.tsx";
import Reports from "./pages/Reports.tsx";
import Settings from "./pages/Settings.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>,
        loader: mainLoader,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/transactions',
                element: <Transactions/>
            },
            {
                path: '/goals',
                element: <Goals/>
            },
            {
                path: '/reports',
                element: <Reports/>
            },
            {
                path: '/settings',
                element: <Settings/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthPage/>,
        loader: authLoader,
        children: [
            {
                path: '/auth/login',
                element: <LoginForm/>,
            },
            {
                path: '/auth/reg',
                element: <RegisterForm/>
            },
        ]
    },

])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={coreStore}>
            <Loader/>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
