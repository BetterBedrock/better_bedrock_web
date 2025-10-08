import { ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "~/providers/auth";

interface ProfileProtectedRouteProps {
  children: ReactNode;
}

export const ProfileProtectedRoute = ({ children }: ProfileProtectedRouteProps) => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.name !== id && !user?.admin) {
    navigate("..");
    return;
  }

  return <>{children}</>;
};
