import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthApi, Configuration } from "~/lib/api";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";

interface AuthContextProps {
  authenticated: boolean;
  fetched: boolean;
  authenticate: (token: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [cookie, setCookie] = useCookies(["adminSecret"]);
  const { throwError } = useNotification();

  const authenticate = async (token: string) => {
    try {
      const config = new Configuration({
        basePath: baseUrl,
        accessToken: token,
      });

      const authApi = new AuthApi(config);

      await authApi.authControllerAuthenticate();

      setCookie("adminSecret", token);
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      throwError(err, "Failed to authenticate");
    }
    setFetched(true);
  };

  useEffect(() => {
    if (cookie.adminSecret && cookie.adminSecret !== "") {
      authenticate(cookie.adminSecret);
    }
  }, [cookie]);

  return (
    <AuthContext.Provider value={{ fetched, authenticate, authenticated }}>
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
