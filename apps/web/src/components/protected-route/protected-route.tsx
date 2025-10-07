import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { Routes } from "~/utils/routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { fetched, user } = useAuth();
  const { sendNotification } = useNotification();
  const navigate = useNavigate();

  if (!fetched) {
    return;
  }

  if (fetched && !user?.admin) {
    sendNotification({
      title: "No access",
      label: "You don't have access to this page",
      type: "error",
    });
    navigate(Routes.HOME);
    return;
  }

  return children;
};
