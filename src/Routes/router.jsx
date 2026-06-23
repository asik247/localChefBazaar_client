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
const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {index:true,Component:HomePage},
            {path:'about',Component:AboutPage},
            {path:'meals',Component:Meals},
            {path:'details/:id',element:<PrivateRoute><Details></Details></PrivateRoute>},
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
    }
])
export default router