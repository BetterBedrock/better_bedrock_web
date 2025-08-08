import XxDreamxXYT4286 from "~/assets/images/avatars/XxDreamxXYT4286.png";
import Steve from "~/assets/images/avatars/Steve.png";
import bestfurth from "~/assets/images/avatars/bestfurth.png";

export interface CreatorsListElement {
    profileId?: string;
    skin?: string;
    name: string;
    description?: string;
    creator?: boolean;
}

export const CREATORS: CreatorsListElement[] = [
    {
        profileId: "e38b9f4ad0f749dda49fabe2e4e4676b",
        name: "AxmBro",
        description: "Texture Packs",
        creator: true,
    },
    {
        profileId: "a4b07b9b-5a14-4ea7-b103-1b8055620697",
        name: "iDarkQ",
        description: "Website",
        creator: true,
    }
]

export const HELPERS: CreatorsListElement[] = [
    {
        skin: bestfurth,
        name: "Bestfurth",
        description: "Helper",
    },
    {
        skin: Steve,
        name: "Ayaanthe0ne",
        description: "Helper",
    },
    {
        skin: XxDreamxXYT4286,
        name: "Viridlmao",
        description: "Helper",
    },
    {
        profileId: "182a0863fee6482b881c34b0d032a2c5",
        name: "Sparkskye",
        description: "Helper",
    }
]