import { useAuth } from "@/_providers/auth";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface ProfileProtectedRouteProps {
  children: ReactNode;
}

export const ProfileProtectedRoute = ({
  children,
}: ProfileProtectedRouteProps) => {
  const { name } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  if (user?.name !== name && !user?.admin) {
    router.push("..");
    return;
  }

  return <>{children}</>;
};
