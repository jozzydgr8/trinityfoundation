import { Outlet } from "react-router-dom";
import { SideNav } from "../Shared/SideNav";
// import { Header } from "./shared/Header";


export default function Layout(){

    return(
        // <Outlet/>
        <div className="displaygrid">
            {/* sidenav */}
            <div className="one">
                <SideNav/>
            </div>
            {/* Header */}
            <div className="second">
             <h1 className="text-center" style={{
                color:'#8e1670',
                paddingTop:'20px',
             }}>Welcome to TrinityFoundation admin </h1>
            </div>
            {/* Outlet */}
            <div className="three">
            <Outlet/>
            </div>

        </div>
    )
}