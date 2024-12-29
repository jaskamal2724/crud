import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AddProduct from "./components/Add";
import Update from './components/Update'
import Delete from './components/Delete'
import Home from "./components/Home";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/add",
                element:<AddProduct/>
            },
            {
                path:"/update",
                element:<Update/>
            },
            {
                path:"/delete",
                element:<Delete/>
            },
            {
                path:"/",
                element:<Home/>
            },
        ]
    }
])

export default router