import { Configuration, ProjectApi, ProjectType, SearchOrder, UpdateProjectDto } from "@/lib/api";
import { axiosCustomInstance } from "@/lib/client";
import { baseUrl } from "@/utils/url";

const config = new Configuration({
    basePath: baseUrl,
});

const projectApi = new ProjectApi(config, undefined, axiosCustomInstance);

export const fetchUserProjectsRequest = async (
    id: string,
    secret: string,
) =>
    projectApi.projectControllerUserProjects(id, { headers: { Authorization: `Bearer ${secret}` } });

export const fetchSubmittedProjectsRequest = async (secret: string) => projectApi.projectControllerSubmitted({ headers: { Authorization: `Bearer ${secret}` } });

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
export const fetchDraftDetailsRequest = async (id: string, secret: string) => projectApi.projectControllerDraftDetails(id, { headers: { Authorization: `Bearer ${secret}` } });

export const deleteRatingRequest = async (id: string, secret: string) => await projectApi.projectControllerDeleteRating(id, { headers: { "Authorization": `Bearer ${secret}` } });
export const postRatingRequest = async (id: string, rating: number, secret: string) => await projectApi.projectControllerRateProject(
    id,
    rating,
    { headers: { Authorization: `Bearer ${secret}` } }
);

export const createProjectRequest = async (title: string, secret: string) => projectApi.projectControllerCreate({ title }, { headers: { Authorization: `Bearer ${secret}` } });

export const updateProjectRequest = async (id: string, project: UpdateProjectDto, secret: string) => projectApi.projectControllerUpdate(id, project, { headers: { Authorization: `Bearer ${secret}` } });

export const fetchCommentsRequest = async (id: string) => projectApi.projectControllerComments(id);
export const deleteCommentRequest = async (id: string, secret: string) => projectApi.projectControllerDeleteComment(id, { headers: { Authorization: `Bearer ${secret}` } });
export const postCommentRequest = async (id: string, content: string, secret: string) => projectApi.projectControllerPostComment(id, { content }, { headers: { Authorization: `Bearer ${secret}` } });
export const replyToCommentRequest = async (id: string, parentId: string, content: string, secret: string) => projectApi.projectControllerReplyToComment(id, parentId, { content }, { headers: { Authorization: `Bearer ${secret}` } });