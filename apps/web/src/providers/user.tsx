import { createContext, ReactNode, useContext } from "react";
import { useCookies } from "react-cookie";
import { Configuration, SimpleUserDto, UpdateProfileDto, UserApi, UserDto, UserRatingDto } from "~/lib/api";
import { useAuth } from "~/providers/auth";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";

interface UserContextProps {
  findUserByName: (name: string) => Promise<SimpleUserDto | undefined>;
  findUserById: (id: string) => Promise<SimpleUserDto | undefined>;
  updateProfile: (profile: UpdateProfileDto) => Promise<UserDto | undefined>;
  getProfileRating: (userId: string) => Promise<UserRatingDto | undefined>;
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
      throwError(err, "Failed to fetch find user");
    }
  };

  const findUserById = async (id: string): Promise<SimpleUserDto | undefined> => {
    try {
      const { data } = await userApi.userControllerUserInfoById(id);
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch find user");
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

  const getProfileRating = async (userId: string) => {
    try {
      const { data } = await userApi.userControllerGetUserRating(userId);
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch user rating");
    }
  };

  return (
    <UserContext.Provider value={{ updateProfile, getProfileRating, findUserByName, findUserById }}>
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
