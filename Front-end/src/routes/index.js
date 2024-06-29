import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/LoginPage/SignUpPage";
import ManagementPage from "../pages/AdminPage/ManagementPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"

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
    },
    {
        path: '/profile',
        page: ProfilePage
    }
]
