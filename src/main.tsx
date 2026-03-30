import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthPage from "./pages/AuthPage.tsx";
import {authLoader} from "./loader/authLoader.ts";
import MainPage from "./pages/MainPage.tsx";
import LoginForm from "./components/Auth/LoginForm.tsx";
import RegisterForm from "./components/Auth/RegisterForm.tsx";
import {coreStore} from "./Store/store.ts"
import {Provider} from "react-redux";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>,
        loader: authLoader
    },
    {
        path: '/auth',
        element: <AuthPage/>,
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
        <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
