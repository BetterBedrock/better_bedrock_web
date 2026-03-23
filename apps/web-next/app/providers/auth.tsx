"use client";

import { UserDto } from "@/shared/lib/openapi";
import { useNotification } from "./notification";
import { useGoogleLogin } from "@react-oauth/google";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { googleAuthorizeRequest } from "@/entities/auth/api/auth-service";
import { authenticateToken } from "@/entities/auth/api/authenticate-token";
import { logoutToken } from "@/entities/auth/api/logout-token";

interface AuthContextProps {
  fetched: boolean;
  user: UserDto | undefined;
  setUser: Dispatch<SetStateAction<UserDto | undefined>>;
  googleLogin: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { throwError, sendNotification } = useNotification();
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState<UserDto | undefined>();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await googleAuthorizeRequest(
          tokenResponse.access_token,
        );

        authenticate(data.token);
      } catch (err) {
        throwError(err, "Failed to login with Google");
      }
    },
    onError: (errorResponse) =>
      throwError(errorResponse, "Failed to login with Google"),
  });

  const logout = async () => {
    await logoutToken();
    setUser(undefined);

    sendNotification({
      type: "info",
      title: "Logout",
      label: "You have been logged out",
    });

    window.location.reload();
  };

  const authenticate = async (secret?: string) => {
    const { data: userData, error } = await authenticateToken(secret);

    if (error) {
      throwError(null, error);
      return;
    }

    setUser(userData);
    setFetched(true);
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, fetched, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth has to be used within AuthContext");
  return context;
};
