import { COMMUNITY_LIST } from "~/content/constants/content-community";
import { MAIN_LIST } from "~/content/constants/content-main";
import { SIDE_PROJECTS_LIST } from "~/content/constants/content-side-projects";

export const CONTENT = [...MAIN_LIST.lists, ...COMMUNITY_LIST.lists, ...SIDE_PROJECTS_LIST.lists];
