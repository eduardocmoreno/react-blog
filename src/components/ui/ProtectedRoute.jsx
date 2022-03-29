import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector(s => s.user);
  if(!user.email) return <Navigate to="/" replace />;
  return children ?? <Outlet />;
}