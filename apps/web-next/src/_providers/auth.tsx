"use client";

import { UserDto, Configuration, AuthApi } from "@/_lib/api";
import { useNotification } from "@/_providers/notification";
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
import { useCookies } from "next-client-cookies";
import { baseUrl } from "@/utils/url";

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
      const config = new Configuration({ basePath: baseUrl });
      const authApi = new AuthApi(config);

      try {
        const { data } = await authApi.authControllerGoogleAuthorize({
          token: tokenResponse.access_token,
        });
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
    onError: (errorResponse) => throwError(errorResponse, "Failed to login with Google"),
  });

  const authenticate = async (secret: string) => {
    setFetched(false);
    try {
      const config = new Configuration({
        basePath: baseUrl,
        accessToken: secret,
      });

      const authApi = new AuthApi(config);
      const { data } = await authApi.authControllerAuthenticate();
      setUser(data);
    } catch (err) {
      throwError(err, "Failed to authenticate");
      logout();
    } finally {
      setFetched(true);
    }
  };

  const logout = () => {
    cookies.remove("secret");
    setUser(undefined);

    sendNotification({
      type: "info",
      title: "Logout",
      label: "You have been logged out",
    });

    window.location.reload();
  };

  useEffect(() => {
    const secret = cookies.get("secret");
    if (secret && secret !== "") {
      authenticate(secret);
    } else {
      setFetched(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetched, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth has to be used within AuthContext");
  return context;
};
