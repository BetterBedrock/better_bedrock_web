import { Configuration, ProjectApi, ProjectType, SearchOrder } from "@/_lib/api";
import { baseUrl } from "@/utils/url";

const config = new Configuration({
    basePath: baseUrl,
});

const projectApi = new ProjectApi(config);

export const fetchUserProjects = async (
    id: string,
) =>
    await projectApi.projectControllerUserProjects(id);

export const searchProjectsRequest = async (type?: ProjectType, order?: SearchOrder | undefined, text?: string, page?: number) => await projectApi.projectControllerSearch(
    type,
    order,
    text,
    page
);

export const fetchProjectsBasicInfoRequest = async (ids: string[]) => await projectApi.projectControllerProjectsBasicInfo({
    ids,
});

export const fetchProjectDetailsRequest = async (id: string) => projectApi.projectControllerProjectDetails(id);

export const deleteRatingRequest = async (id: string, secret: string) => await projectApi.projectControllerDeleteRating(id, { headers: { "Authorization": `Bearer ${secret}` } });
export const postRatingRequest = async (id: string, rating: number, secret: string) => await projectApi.projectControllerRateProject(
    id,
    rating,
    { headers: { Authorization: `Bearer ${secret}` } }
);

export const fetchCommentsRequest = async (id: string) => projectApi.projectControllerComments(id);
export const deleteCommentRequest = async (id: string, secret: string) => projectApi.projectControllerDeleteComment(id, { headers: { Authorization: `Bearer ${secret}` } });
export const postCommentRequest = async (id: string, content: string, secret: string) => projectApi.projectControllerPostComment(id, { content }, { headers: { Authorization: `Bearer ${secret}` } });
export const replyToCommentRequest = async (id: string, parentId: string, content: string, secret: string) => projectApi.projectControllerReplyToComment(id, parentId, { content }, { headers: { Authorization: `Bearer ${secret}` } });