"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { SearchOrder } from "@/shared/lib/openapi";
import { Link } from "@/shared/ui/link";
import { usePathname, useSearchParams } from "next/navigation";

import styles from "./projects-card.module.scss";

interface ProjectsCardOrderButtonProps {
  order: SearchOrder;
  defaultOrder: SearchOrder;
}

export const ProjectsCardOrderButton = ({
  order,
  defaultOrder,
}: ProjectsCardOrderButtonProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams?.toString());
  params.set("o", order.replaceAll(" ", ""));
  const href = `${pathname}?${params.toString()}`;

  return (
    <Link link={href} hideStyles className={styles.action} scroll={false}>
      <Button
        type="dark"
        width="100%"
        center
        isClicked={order === defaultOrder}
        isToggled={order === defaultOrder}
      >
        <BedrockText type="p" text={order} color="white" />
      </Button>
    </Link>
  );
};
