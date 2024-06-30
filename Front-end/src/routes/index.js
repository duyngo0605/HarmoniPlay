import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/LoginPage/SignUpPage";
import ManagementPage from "../pages/AdminPage/ManagementPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import ArtistPage from "../pages/ArtistPage/ArtistPage";
import Player from "../pages/components/Player";
import LibraryPage from "../pages/LibraryPage/LibraryPage"
import TrackPage from "../pages/TrackPage/TrackPage"
import HistoryPage from "../pages/HistoryPage/History"

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
    },
    {
        path: '/artist/:id',
        page: ArtistPage
    },
    {
        path: '/player/:id',
        page: Player
    },
    {
        path: '/history',
        page: HistoryPage
    },
    {
        path: '/library',
        page: LibraryPage
    },
    {
        path: '/track/:id',
        page: TrackPage
    }
]
