
export interface VideoTag {
    id: string;
    name: string;
    color: string;
}

export interface InformationTab {
    id: string;
    name: string;
    faq: InformationFAQ;
    videos?: InformationVideos;
    deprectedVideos?: InformationVideos;
}

interface InformationFAQ {
    description: string;
    questions: InformationFAQQuestion[];
}

export interface InformationVideos {
    description: string;
    videos: InformationVideo[];
}

export interface InformationFAQQuestion {
    question: string;
    answer: string;
}

export interface InformationVideo {
    title: string;
    description: string;
    link: string;
    tags?: string[];
}