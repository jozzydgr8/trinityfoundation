import { Outlet } from "react-router-dom";
import Footer from "./Shared/Footer";
import Navbar from "./Shared/Navbar";
import ScrollToTop from "./Shared/ScrollToTop";


export function Layout(){
    return(
        <>  
                
                <ScrollToTop/>
                <Navbar/>
                <Outlet/>
                <Footer/>
            
        </>
    )
}