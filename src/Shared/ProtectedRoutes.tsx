import { User } from "firebase/auth"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { UseDataContext } from "../Context/UseDataContext"

type proptype={
    user:User | null,
    children: ReactNode
}
export const ProtectedRoutes = ({children, user}:proptype)=>{
    const {adminUsers} = UseDataContext();
    if(!user){
       return <Navigate to={'/session'}/>
    }
      const matchedUser = adminUsers?.find(u => u.email === user.email);
    if (!matchedUser || matchedUser.admin !== true) {
    return <Navigate to="/session" />;
  }
    return  <>{children}</> 
}