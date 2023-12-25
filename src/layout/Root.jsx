import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";




const Root = () => {
    return (
        
            <div className="m-10">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Toaster></Toaster>
                <Footer></Footer>

            </div>
       
    );
};

export default Root;