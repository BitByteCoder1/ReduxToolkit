import Login from "./Container/Login/login";
import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./Container/Signup/signup";
import Dashboard from "./Container/Dashboard/dashboard";
import CustomDrawer from "./Components/Drawer/customDrawer";
import "./App.css";
import Post from "./Container/Post/Post";

function App() {
   const location = useLocation();

   return (
      <div
         className={`${
            !(location.pathname === "/login" || location.pathname === "/signup") ? "Container" : ""
         }`}
      >
         {!(location.pathname === "/login" || location.pathname === "/signup") && <CustomDrawer />}

         <div className="bodyConatiner">
            <Routes>
               <Route path="/" element={<Dashboard />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/post" element={<Post />} />
            </Routes>
         </div>
      </div>
   );
}

export default App;
