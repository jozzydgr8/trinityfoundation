import { User } from "../Types/Types"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { UseDataContext } from "../Context/UseDataContext"

type proptype={
    user:User | null,
    children: ReactNode
}
export const ProtectedRoutes = ({children, user}:proptype)=>{
    if(!user){
       return <Navigate to={'/session'}/>
    }
    return  <>{children}</> 
}