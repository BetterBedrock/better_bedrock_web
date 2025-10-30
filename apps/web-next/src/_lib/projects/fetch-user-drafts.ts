import { fetchUserProjects as fetchUserProjectsRequest } from "@/_services/project-service";
import dayjs from "dayjs";

export const fetchUserDrafts = async (id: string) => {
    const { data } = await fetchUserProjectsRequest(id);
    const published = data?.filter((d) => d.draft === false).map((d) => d.id) ?? [];

    return (data?.filter((d) => d.draft === true && !published.includes(d.id)) ?? []).sort((a, b) =>
        dayjs(a.lastChanged).isBefore(b.lastChanged) ? 1 : -1,
    );
}