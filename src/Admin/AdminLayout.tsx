import { Outlet } from "react-router-dom";
import { SideNav } from "../Shared/SideNav";



export default function Layout(){

    return(
        // <Outlet/>
        <>
            <SideNav/>
            <Outlet/>
        </>
    )
}