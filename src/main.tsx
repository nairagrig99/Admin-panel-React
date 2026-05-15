import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import AuthPage from "./pages/AuthPage.tsx";

import MainPage from "./pages/MainPage.tsx";
import LoginForm from "./components/Auth/LoginForm.tsx";
import RegisterForm from "./components/Auth/RegisterForm.tsx";
import {coreStore} from "./Store/store.ts"
import {Provider} from "react-redux";
import Loader from "./components/UI/Loader.tsx";
import {loginLoader, protectedLoader} from "./loader/authLoader.ts";

const Transactions = lazy(() => import("./pages/TransactionsPage.tsx"));
import GoalsPage from "./pages/GoalsPage.tsx";
import {AuthWrapper} from "./components/Auth/AuthWrapper.tsx";

export const router = createBrowserRouter([
    {
        element: <MainPage/>,
        loader: protectedLoader,
        children: [
            {
                index: true,
                element: <Navigate to="/transactions" replace/>
            },
            {
                path: 'transactions',
                element: <Transactions/>,
            },
            {
                path: 'goals',
                element: <GoalsPage/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthPage/>,
        loader: loginLoader,
        children: [
            {
                index: true,
                element: <Navigate to="login" replace/>
            },
            {
                path: 'login',
                element: <LoginForm/>,
            },
            {
                path: 'reg',
                element: <RegisterForm/>
            },
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={coreStore}>
            <AuthWrapper>
                <Suspense fallback={<Loader/>}>
                    <RouterProvider router={router}/>
                    <Loader></Loader>
                </Suspense>
            </AuthWrapper>
        </Provider>
    </StrictMode>,
)
