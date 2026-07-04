import { createBrowserRouter } from "react-router"
import RootLayout from "../Layouts/RootLayout"
import HomePage from "../Pages/HomePage"
import AboutPage from "../Pages/AboutPage"
import Meals from "../Pages/Meals/Meals"
import Details from "../Pages/CardDetails/Details"
import AuthLayout from "../Layouts/AuthLayout"
import Login from "../Auth/Login&Registation/Login"
import Registation from "../Auth/Login&Registation/Registation"
import PrivateRoute from "./PrivateRoute"
import Order from "../Pages/OrdersPage/Order"
import DashboardLayout from "../Layouts/DashboardLayout"
import MyProfile from "../Pages/DashBoard/UserDashboard/MyProfile"
import DashboarHome from "../Pages/DashBoard/DashboardHome/DashboarHome"
import MyOrders from "../Pages/DashBoard/UserDashboard/MyOrders"
import PaymentSuccess from "../Pages/DashBoard/Payments/PaymentSuccess"
import PaymenntCancled from "../Pages/DashBoard/Payments/PaymenntCancled"
import MyReviews from "../Pages/DashBoard/UserDashboard/MyReviews"
import FavoritesMeals from "../Pages/DashBoard/UserDashboard/FavoritesMeals"
import CreateMeal from "../Pages/DashBoard/ChefDashboard/CreateMeal"
import MyProfileChef from "../Pages/DashBoard/ChefDashboard/MyProfileChef"
import MyMeals from "../Pages/DashBoard/ChefDashboard/MyMeals"
import OrderRequest from "../Pages/DashBoard/ChefDashboard/OrderRequest"
import AdminProfile from "../Pages/DashBoard/AdminDashboard/AdminProfile"
import ManageUsers from "../Pages/DashBoard/AdminDashboard/ManageUsers"
import ManageRequest from "../Pages/DashBoard/AdminDashboard/ManageRequest"
import PlatformStatistics from "../Pages/DashBoard/AdminDashboard/PlatformStatistics"
import MealUpdate from "../Pages/DashBoard/ChefDashboard/MealUpdate"
const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            { index: true, Component: HomePage },
            { path: 'about', element: <PrivateRoute><AboutPage></AboutPage></PrivateRoute> },
            { path: 'meals', element: <PrivateRoute><Meals></Meals></PrivateRoute> },
            { path: 'details/:id', element: <PrivateRoute><Details></Details></PrivateRoute> },
            { path: 'orders/:id', element: <PrivateRoute><Order></Order></PrivateRoute> },

        ]
    },
    //? Auth Layout;
    {
        path: 'auth',
        Component: AuthLayout,
        children: [
            { index: true, element: <Login></Login> },
            { path: 'registation', element: <Registation></Registation> }
        ]
    },
    //! DashBoard Layouts;
    {
        path: 'dashboardLayouts',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            { index: true, element: <PrivateRoute><DashboarHome></DashboarHome></PrivateRoute> },
            { path: 'myProfile', element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute> },
            { path: 'myOrders', element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute> },
            { path: 'myReviews', element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute> },
            { path: 'favorites', element: <PrivateRoute><FavoritesMeals></FavoritesMeals></PrivateRoute> },
            { path: 'payment-success', element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute> },
            { path: 'payment-cancelled', element: <PrivateRoute><PaymenntCancled></PaymenntCancled></PrivateRoute> },
            //Todo Chef info;
            { path: 'myProfileChef', element: <PrivateRoute><MyProfileChef></MyProfileChef></PrivateRoute> },
            { path: 'createMeal', element: <PrivateRoute><CreateMeal></CreateMeal></PrivateRoute> },
            { path: 'myMeals', element: <PrivateRoute><MyMeals></MyMeals></PrivateRoute> },
            { path: 'myMeals_update/:id', element: <PrivateRoute><MealUpdate></MealUpdate></PrivateRoute> },
            { path: 'orderRequest', element: <PrivateRoute><OrderRequest></OrderRequest></PrivateRoute> },
            //Todo Admin info;
            { path: 'adminProfile', element: <PrivateRoute><AdminProfile></AdminProfile></PrivateRoute> },
            { path: 'manageUsers', element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute> },
            { path: 'manageRequest', element: <PrivateRoute><ManageRequest></ManageRequest></PrivateRoute> },
            { path: 'platformStatistics', element: <PrivateRoute><PlatformStatistics></PlatformStatistics></PrivateRoute> },
        ]
    }
])
export default router