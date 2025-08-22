import { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { Routes } from "~/utils/routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { fetched, authenticated, adminAuthenticate } = useAuth();
  const [cookies] = useCookies(["adminSecret"]);
  const { sendNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    adminAuthenticate(cookies.adminSecret);
  }, []);

  if (!fetched) {
    return;
  }

  if (fetched && !authenticated) {
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
