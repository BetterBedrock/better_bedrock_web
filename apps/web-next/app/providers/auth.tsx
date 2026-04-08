"use client";

import { UserDto } from "@/shared/lib/openapi";
import { useNotification } from "./notification";
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
import { authenticateToken, logoutToken } from "@/entities/auth";

interface AuthContextProps {
  fetched: boolean;
  user: UserDto | undefined;
  setUser: Dispatch<SetStateAction<UserDto | undefined>>;
  authenticate: (secret?: string) => void;
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

  const authenticate = useCallback(
    async (secret?: string) => {
      const { data: userData, error } = await authenticateToken(secret);

      if (error) {
        throwError(null, error);
        return;
      }

      setUser(userData);
      setFetched(true);
    },
    [throwError],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    authenticate();
  }, [authenticate]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, fetched, logout, authenticate }}
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
