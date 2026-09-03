import { Outlet } from "react-router-dom";
import { SideNav } from "../Shared/SideNav";
import Breadcrumbs from "../Shared/BreadCrumbs";



export default function Layout(){

    return(
     
        <>
            <SideNav/>
            <Breadcrumbs/>
            <Outlet/>
        </>
    )
}