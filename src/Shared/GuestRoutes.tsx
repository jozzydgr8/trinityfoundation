import { User } from "../Types/Types"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"


type proptype = {
  user: User | null,
  children: ReactNode
}

export const GuestRoutes = ({children, user}:proptype)=>{
    if(!user){
         return  <>{children}</> 
    }
    return <Navigate to={'/admin_jctbdil1$/'}/>
   
}