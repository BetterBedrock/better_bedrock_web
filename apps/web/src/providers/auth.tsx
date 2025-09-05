import { useGoogleLogin } from "@react-oauth/google";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthApi, Configuration, UserDto } from "~/lib/api";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";

interface AuthContextProps {
  authenticated: boolean;
  fetched: boolean;
  user: UserDto | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserDto | undefined>>;
  googleLogin: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["secret"]);
  const { throwError, sendNotification } = useNotification();
  const [user, setUser] = useState<UserDto | undefined>();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const config = new Configuration({
        basePath: baseUrl,
      });

      const authApi = new AuthApi(config);

      try {
        const { data } = await authApi.authControllerGoogleAuthorize({
          token: tokenResponse.access_token,
        });
        setCookie("secret", data.token);
      } catch (err) {
        throwError(err, "Failed to login with google");
      }
    },
    onError: (errorResponse) => throwError(errorResponse, "Failed to login with google"),
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
    }

    setFetched(true);
  };

  const logout = () => {
    removeCookie("secret");
    setUser(undefined);
    setAuthenticated(false);
    setFetched(false);

    sendNotification({
      type: "info",
      title: "Logout",
      label: "You have been logged out",
    });
  };

  useEffect(() => {
    if (cookie.secret && cookie.secret !== "") {
      authenticate(cookie.secret);
    }
  }, [cookie.secret]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, fetched, googleLogin, authenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth has to be used within AuthContext");
  }

  return context;
};
