import { createBrowserRouter } from "react-router"
import RootLayout from "../Layouts/RootLayout"
import HomePage from "../Pages/HomePage"
import AboutPage from "../Pages/AboutPage"
import Meals from "../Pages/Meals/Meals"
import Details from "../Pages/CardDetails/Details"
const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {index:true,Component:HomePage},
            {path:'about',Component:AboutPage},
            {path:'meals',Component:Meals},
            {path:'details/:id',Component:Details},
        ]
    }
])
export default router