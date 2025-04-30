export interface SideProjectsListProps {
    title: string;
    description: string;
    imageAssetUrl?: string;
}

export const SIDE_PROJECTS_LIST: SideProjectsListProps[] = [
    {
        title: "Murder Detector+ v3.2",
        description: "@axmbro",
        imageAssetUrl: "/static/images/murderDetectorThumbnail",
    },
    {
        title: "Custom Sky Overlay",
        description: "@axmbro",
        imageAssetUrl: "/static/images/skyOverlayThumbnail",
    },
];
