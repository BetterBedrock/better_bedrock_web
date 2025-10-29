import { useState, useEffect } from "react";
import { SimpleProjectDto } from "~/lib/api";
import { useProject } from "~/providers/project";

export const useFetchSubmittedProjects = () => {
    const { submittedProjects } = useProject();
    const [projects, setProjects] = useState<SimpleProjectDto[] | undefined>();

    const fetchProjects = async () => {
        const fetchedProjects = await submittedProjects();
        setProjects(fetchedProjects ?? []);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return projects;
};