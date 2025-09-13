import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserDto,
  UserRatingDto,
  ManageProfileDto,
  SimpleUserDto,
  SimpleProjectDto,
  AnalyticsDto,
} from "~/lib/api";
import { useAuth } from "~/providers/auth";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";

interface UserProfileContextProps {
  ownsProfile: boolean;

  settingsOpen: boolean;
  reportOpen: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReportOpen: React.Dispatch<React.SetStateAction<boolean>>;

  drafts: SimpleProjectDto[] | undefined;
  setDrafts: React.Dispatch<React.SetStateAction<SimpleProjectDto[] | undefined>>;

  projects: SimpleProjectDto[] | undefined;
  setProjects: React.Dispatch<React.SetStateAction<SimpleProjectDto[] | undefined>>;

  analytics: AnalyticsDto[] | undefined;
  setAnalytics: React.Dispatch<React.SetStateAction<AnalyticsDto[] | undefined>>;

  detailedSelectedUser: UserDto | undefined;
  user: UserDto | undefined;
  fetchedDetailedUser: boolean;
  rating: UserRatingDto | undefined;

  selectedUser: SimpleUserDto | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<SimpleUserDto | undefined>>;

  handleProfileSave: (data: ManageProfileDto) => Promise<void>;
  fetchDetails: (userData?: SimpleUserDto) => Promise<void>;
}

interface UserProfileProviderProps {
  children: ReactNode;
}

const UserProfileContext = createContext<UserProfileContextProps | undefined>(undefined);

export const UserProfileProvider = ({ children }: UserProfileProviderProps) => {
  const navigate = useNavigate();
  const { updateProfile, manageProfile, getProfileRating, findDetailedUser } = useUser();
  const { user } = useAuth();
  const [detailedUser, setDetailedUser] = useState<UserDto | undefined>();
  const [fetchedDetailedUser, setFetchedDetailedUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SimpleUserDto | undefined>(undefined);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [rating, setRating] = useState<UserRatingDto | undefined>(undefined);

  const [drafts, setDrafts] = useState<SimpleProjectDto[] | undefined>(undefined);
  const [projects, setProjects] = useState<SimpleProjectDto[] | undefined>(undefined);
  const [analytics, setAnalytics] = useState<AnalyticsDto[] | undefined>(undefined);

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

    const userRating = await getProfileRating(targetUser.id);
    setRating(userRating);
    setFetchedDetailedUser(true);
  };

  const handleProfileSave = async (data: ManageProfileDto) => {
    if (ownsProfile) {
      const newUser = await updateProfile(data);
      if (!newUser) return;

      navigate(Routes.PROFILE + "/" + newUser.name + "/projects");

      setSelectedUser(newUser);
      return;
    }
    if (!detailedUser) return;

    const newUser = await manageProfile(detailedUser.id, data);
    if (!newUser) return;

    setDetailedUser(newUser);
    setSelectedUser(newUser);
    navigate(Routes.PROFILE + "/" + newUser.name + "/projects");
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
        reportOpen,
        setReportOpen,
        user,
        handleProfileSave,
        fetchedDetailedUser,
        rating,
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
