import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/LoginPage/SignUpPage";
import ManagementPage from "../pages/AdminPage/ManagementPage"

export const routes = [
    {
        path: '/',
        page: HomePage
    },
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/signup',
        page: SignUpPage
    },
    {
        path: '/admin',
        page: ManagementPage
    }
]
