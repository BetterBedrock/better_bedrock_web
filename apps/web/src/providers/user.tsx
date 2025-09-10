import { createContext, ReactNode, useContext } from "react";
import { useCookies } from "react-cookie";
import {
  Configuration,
  DetailedUserDto,
  ManageProfileDto,
  SimpleUserDto,
  UpdateProfileDto,
  UserApi,
  UserDto,
  UserRatingDto,
} from "~/lib/api";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";

interface UserContextProps {
  findUserByName: (name: string) => Promise<SimpleUserDto | undefined>;
  findUserById: (id: string) => Promise<SimpleUserDto | undefined>;
  findDetailedUser: (id: string) => Promise<DetailedUserDto | undefined>;

  updateProfile: (profile: UpdateProfileDto) => Promise<UserDto | undefined>;
  manageProfile: (id: string, profile: ManageProfileDto) => Promise<UserDto | undefined>;
  getProfileRating: (userId: string) => Promise<UserRatingDto | undefined>;
  getUserRating: (projectId: string) => Promise<number | undefined>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { setUser } = useAuth();
  const [cookie] = useCookies(["secret"]);

  const config = new Configuration({
    basePath: baseUrl,
    accessToken: cookie.secret,
  });
  const userApi = new UserApi(config);
  const { throwError } = useNotification();

  const findUserByName = async (name: string): Promise<SimpleUserDto | undefined> => {
    try {
      const { data } = await userApi.userControllerUserInfoByName(name);
      return data;
    } catch (err) {
      throwError(err, "Failed to find user by name");
    }
  };

  const findUserById = async (id: string): Promise<SimpleUserDto | undefined> => {
    try {
      const { data } = await userApi.userControllerUserInfoById(id);
      return data;
    } catch (err) {
      throwError(err, "Failed to find user by id");
    }
  };

  const findDetailedUser = async (id: string): Promise<DetailedUserDto | undefined> => {
    try {
      const { data } = await userApi.userControllerDetailedUserInfo(id);
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch details about user");
    }
  };

  const updateProfile = async (profile: UpdateProfileDto) => {
    try {
      const { data } = await userApi.userControllerUpdateProfile(profile);
      setUser(data);
      return data;
    } catch (err) {
      throwError(err, "Failed to update user profile");
    }
  };

  const manageProfile = async (id: string, profile: ManageProfileDto) => {
    try {
      const { data } = await userApi.userControllerManageProfile(id, profile);
      return data;
    } catch (err) {
      throwError(err, "Failed to make change in user profil");
    }
  };

  const getProfileRating = async (userId: string) => {
    try {
      const { data } = await userApi.userControllerProfileRating(userId);
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch user rating");
    }
  };

  const getUserRating = async (projectId: string) => {
    try {
      const { data } = await userApi.userControllerUserRating(projectId);
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch user rating");
    }
  };

  return (
    <UserContext.Provider
      value={{
        manageProfile,
        findDetailedUser,
        updateProfile,
        getProfileRating,
        getUserRating,
        findUserByName,
        findUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUser has to be used within UserContext");
  }

  return context;
};
