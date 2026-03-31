"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/lib/utils";
import { bedrockDownloadPages } from "@/shared/config";
import { ProjectType } from "@/shared/lib/openapi";
import { useSearchParams } from "next/navigation";

interface ProjectsCardTypeButtonProps {
  selectedKey: ProjectType | undefined;
  label: string;
  defaultType?: ProjectType;
}

export const ProjectsCardTypeButton = ({
  selectedKey,
  label,
  defaultType,
}: ProjectsCardTypeButtonProps) => {
  const searchParams = useSearchParams();

  const page =
    bedrockDownloadPages.find((p) => p.details.type === selectedKey) ??
    undefined;

  return (
    <Link
      scroll={false}
      link={Routes.DOWNLOADS_BEDROCK + `/${page?.details.url ?? "mods"}` + `?${searchParams?.toString()}`}
      hideStyles
    >
      <Button
        type={selectedKey === defaultType ? "green" : "white"}
        isClicked={selectedKey === defaultType}
        isToggled={selectedKey === defaultType}
        center
        width="100%"
      >
        <BedrockText
          text={label}
          color={selectedKey === defaultType ? "white" : "black"}
          type="p"
        />
      </Button>
    </Link>
  );
};
