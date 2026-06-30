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
const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {index:true,Component:HomePage},
            {path:'about',element:<PrivateRoute><AboutPage></AboutPage></PrivateRoute>},
            {path:'meals',element:<PrivateRoute><Meals></Meals></PrivateRoute>},
            {path:'details/:id',element:<PrivateRoute><Details></Details></PrivateRoute>},
            {path:'orders/:id',element:<PrivateRoute><Order></Order></PrivateRoute>},
            
        ]
    },
    //? Auth Layout;
    {
        path:'auth',
        Component:AuthLayout,
        children:[
            {index:true,element:<Login></Login>},
            {path:'registation',element:<Registation></Registation>}
        ]
    },
    //! DashBoard Layouts;
    {
        path:'dashboardLayouts',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {index:true,element:<PrivateRoute><DashboarHome></DashboarHome></PrivateRoute>},
            {path:'myProfile',element:<PrivateRoute><MyProfile></MyProfile></PrivateRoute>},
            {path:'myOrders',element:<PrivateRoute><MyOrders></MyOrders></PrivateRoute>},
        ]
    }
])
export default router