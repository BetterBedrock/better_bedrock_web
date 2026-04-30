"use client";

import { pingRequest } from "@/entities/analytic/api/analytics-service";
import { initializeLocalSession } from "@/shared/lib/local-session";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SessionContextProps {
  localSession?: string;
}

interface SessionProviderProps {
  children: ReactNode;
  localSession?: string;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

export const SessionProvider = ({
  children,
  localSession: defaultLocalSession,
}: SessionProviderProps) => {
  const [localSession, setLocalSession] = useState(defaultLocalSession);

  useEffect(() => {
    const initializeSession = async () => {
      const session = localSession ?? (await initializeLocalSession());
      if (session !== localSession) {
        setLocalSession(session);
      }
      return session;
    };

    if(!localSession) {
        initializeSession();
        return;
    }

    pingRequest(localSession);
    const interval = setInterval(pingRequest, 60_000);
    return () => clearInterval(interval);
  }, [localSession]);

  return (
    <SessionContext.Provider value={{ localSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw Error("useSession has to be used within SessionContext");
  }

  return context;
};
