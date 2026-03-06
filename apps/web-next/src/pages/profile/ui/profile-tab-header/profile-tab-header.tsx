"use client";

import { usePathname } from "next/navigation";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { ProfileTabHeaderAction } from "./profile-tab-header-action";

import styles from "./profile-tab-header.module.scss";

const TAB_CONTENT: { [key: string]: { title: string; desc: string } } = {
    projects: { title: "Projects", desc: "Manage and view all your published projects." },
    stats: { title: "Statistics", desc: "Analyze your profile views, downloads, and impact." },
    drafts: { title: "Drafts", desc: "Continue working on your unpublished projects." },
    overview: { title: "Overview", desc: "Welcome to the profile overview." },
};

interface ProfileTabHeaderProps {
    visible?: boolean;
}

export const ProfileTabHeader = ({ visible }: ProfileTabHeaderProps) => {
    const pathname = usePathname();
    const segment = pathname?.split("/").pop()?.toLowerCase() || "";

    const content = visible && TAB_CONTENT[segment] ? TAB_CONTENT[segment] : TAB_CONTENT.overview;

    return (
        <div className={styles.header}>
            <div>
                <BedrockText
                    text={content.title}
                    color="white"
                    type="h1"
                    textAlign="left"
                    font="Minecraft"
                />
                <BedrockText
                    text={content.desc}
                    color="white"
                    textAlign="left"
                    type="p"
                />
            </div>
            {visible && (
                <div className={styles.actionWrapper}>
                    <ProfileTabHeaderAction />
                </div>
            )}
        </div>
    );
};
