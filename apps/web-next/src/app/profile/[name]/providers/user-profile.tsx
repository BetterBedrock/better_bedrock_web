"use client";

import {
  SimpleProjectDto,
  AnalyticsDto,
  UserDto,
  SimpleUserDto,
  ManageProfileDto,
} from "@/_lib/api";
import { useAuth } from "@/_providers/auth";
import { useUser } from "@/_providers/user";
import { Routes } from "@/utils/routes";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface UserProfileContextProps {
  ownsProfile: boolean;

  settingsOpen: boolean;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;

  drafts: SimpleProjectDto[] | undefined;
  setDrafts: Dispatch<SetStateAction<SimpleProjectDto[] | undefined>>;

  projects: SimpleProjectDto[] | undefined;
  setProjects: Dispatch<SetStateAction<SimpleProjectDto[] | undefined>>;

  analytics: AnalyticsDto[] | undefined;
  setAnalytics: Dispatch<SetStateAction<AnalyticsDto[] | undefined>>;

  detailedSelectedUser: UserDto | undefined;
  user: UserDto | undefined;
  fetchedDetailedUser: boolean;

  selectedUser: SimpleUserDto | undefined;
  setSelectedUser: Dispatch<SetStateAction<SimpleUserDto | undefined>>;

  handleProfileSave: (data: ManageProfileDto) => Promise<void>;
  fetchDetails: (userData?: SimpleUserDto) => Promise<void>;
}

interface UserProfileProviderProps {
  children: ReactNode;
  initialUser: SimpleUserDto;
}

const UserProfileContext = createContext<UserProfileContextProps | undefined>(
  undefined
);

export const UserProfileProvider = ({
  children,
  initialUser,
}: UserProfileProviderProps) => {
  const router = useRouter();
  const { updateProfile, manageProfile, findDetailedUser } =
    useUser();
  const { user } = useAuth();

  const [detailedUser, setDetailedUser] = useState<UserDto | undefined>();
  const [fetchedDetailedUser, setFetchedDetailedUser] = useState(!!initialUser);
  const [selectedUser, setSelectedUser] = useState<SimpleUserDto | undefined>(
    initialUser
  );

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [drafts, setDrafts] = useState<SimpleProjectDto[] | undefined>(
    undefined
  );
  const [projects, setProjects] = useState<SimpleProjectDto[] | undefined>(
    undefined
  );
  const [analytics, setAnalytics] = useState<AnalyticsDto[] | undefined>(
    undefined
  );

  const fetchDetails = async (userData?: SimpleUserDto) => {
    const targetUser = userData ?? selectedUser;

    if (!targetUser) return;

    if (user?.admin) {
      const data = await findDetailedUser(targetUser.id);
      setDetailedUser(data);
    }

    if (targetUser.name === user?.name) {
      setDetailedUser(user);
    }

    setFetchedDetailedUser(true);
  };

  const handleProfileSave = async (data: ManageProfileDto) => {
    if (ownsProfile) {
      const newUser = await updateProfile(data);
      if (!newUser) return;

      router.push(Routes.PROFILE + "/" + newUser.name + "/projects");

      setDetailedUser(newUser);
      setSelectedUser(newUser);
      return;
    }
    if (!detailedUser) return;

    const newUser = await manageProfile(detailedUser.id, data);
    if (!newUser) return;

    setDetailedUser(newUser);
    setSelectedUser(newUser);
    router.push(Routes.PROFILE + "/" + newUser.name + "/projects");
  };

  const detailedSelectedUser = detailedUser ?? undefined;
  const ownsProfile = !selectedUser ? false : user?.name === selectedUser.name;

  return (
    <UserProfileContext.Provider
      value={{
        detailedSelectedUser,
        ownsProfile,
        selectedUser,
        setSelectedUser,
        settingsOpen,
        setSettingsOpen,
        user,
        handleProfileSave,
        fetchedDetailedUser,
        fetchDetails,
        drafts,
        setDrafts,
        projects,
        setProjects,
        analytics,
        setAnalytics,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw Error("useUserProfile has to be used within UserProfileContext");
  }

  return context;
};
