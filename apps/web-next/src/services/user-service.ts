import { Configuration, ManageProfileDto, UpdateProfileDto, UserApi } from "@/lib/api";
import { axiosCustomInstance } from "@/lib/client";
import { baseUrl } from "@/utils/url";

const config = new Configuration({
    basePath: baseUrl,
});

const userApi = new UserApi(config, undefined, axiosCustomInstance);

export const findUserByNameRequest = async (
    name: string,
    secret: string,
) =>
    await userApi.userControllerUserInfoByName(name, { headers: { "Authorization": `Bearer ${secret}` } });

export const findUserByIdRequest = async (
    id: string,
    secret: string,
) =>
    await userApi.userControllerUserInfoById(id, { headers: { "Authorization": `Bearer ${secret}` } });

export const fetchUserRatingRequest = async (
    name: string,
) =>
    await userApi.userControllerProfileRating(name);

export const fetchDetailedUserRequest = async (id: string, secret: string,) =>
    await userApi.userControllerDetailedUserInfo(id, { headers: { "Authorization": `Bearer ${secret}` } })

export const updateProfileRequest = async (profile: UpdateProfileDto, secret: string,) =>
    await userApi.userControllerUpdateProfile(profile, { headers: { "Authorization": `Bearer ${secret}` } })

export const manageProfileRequest = async (id: string, profile: ManageProfileDto, secret: string,) =>
    await userApi.userControllerManageProfile(id, profile, { headers: { "Authorization": `Bearer ${secret}` } })

export const fetchUserProjectRatingRequest = async (id: string, secret: string) => userApi.userControllerUserRating(id, { headers: { "Authorization": `Bearer ${secret}` } });