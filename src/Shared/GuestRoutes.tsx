import { User } from "firebase/auth"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { UseDataContext } from "../Context/UseDataContext"

type PropType = {
  user: User | null,
  children: ReactNode
}

export const GuestRoutes = ({ user, children }: PropType) => {
  const { adminUsers } = UseDataContext();

  if (!user) return <>{children}</>;

  const matchedUser = adminUsers?.find(u => u.email === user.email);

  // If user is admin, redirect to /admin, else allow access to guest routes
  if (matchedUser && matchedUser.admin === true) {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
}
