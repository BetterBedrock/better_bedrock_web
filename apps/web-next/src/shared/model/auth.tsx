"use client";

import { UserDto } from "@/shared/api/openapi";
import { useNotification } from "@/shared/model/notification";
import { useGoogleLogin } from "@react-oauth/google";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "next-client-cookies";
import {
  authenticateRequest,
  googleAuthorize,
} from "@/entities/auth/api/auth-service";

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
  const cookies = useCookies();
  const { throwError, sendNotification } = useNotification();
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState<UserDto | undefined>();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await googleAuthorize(tokenResponse.access_token);
        cookies.set("secret", data.token, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        authenticate(data.token);
      } catch (err) {
        throwError(err, "Failed to login with Google");
      }
    },
    onError: (errorResponse) =>
      throwError(errorResponse, "Failed to login with Google"),
  });

  const logout = useCallback(() => {
    cookies.remove("secret");
    setUser(undefined);

    sendNotification({
      type: "info",
      title: "Logout",
      label: "You have been logged out",
    });

    window.location.reload();
  }, [setUser, sendNotification, cookies]);

  const authenticate = useCallback(
    async (secret: string) => {
      setFetched(false);
      try {
        const { data } = await authenticateRequest(secret);
        setUser(data);
      } catch (err) {
        throwError(err, "Failed to authenticate");
        logout();
      } finally {
        setFetched(true);
      }
    },
    [setFetched, setUser, throwError, logout],
  );

  useEffect(() => {
    const secret = cookies.get("secret");
    if (secret && secret !== "") {
      authenticate(secret);
    } else {
      setFetched(true);
    }
  }, [authenticate, cookies]);

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
