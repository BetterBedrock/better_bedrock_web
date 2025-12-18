"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { SearchOrder } from "@/_lib/api";

import { useProjectsCardSearch } from "./providers/projects-card-search";

interface ProjectsCardOrderButtonProps {
  type: SearchOrder;
}

export const ProjectsCardOrderButton = ({
  type,
}: ProjectsCardOrderButtonProps) => {
  const { selectedOrder, setSelectedOrder } = useProjectsCardSearch();

  return (
    <Button
      type="dark"
      width="100%"
      center
      isClicked={type === selectedOrder}
      isToggled={type === selectedOrder}
      onClick={() => setSelectedOrder(type)}
    >
      <BedrockText type="p" text={type} color="white" />
    </Button>
  );
};
