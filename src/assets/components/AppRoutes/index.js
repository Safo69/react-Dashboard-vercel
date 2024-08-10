import { Route, Routes } from "react-router-dom";
import Dashboard from "../../../pages/Dashboard";
import Inventory from "../../../pages/Inventory";
import Orders from "../../../pages/Order";
import Customers from "../../../pages/Customers";

function AppRoutes(){
    return(
    
        <Routes>

            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/Inventory" element={<Inventory />}></Route>

            <Route path="/Orders" element={<Orders />}></Route>

            <Route path="/Customers" element={<Customers />}></Route>

        </Routes>
   
    )
}
export default AppRoutes;