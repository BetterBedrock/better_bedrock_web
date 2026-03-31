import { ButtonGroup } from "@/shared/ui/button-group";
import { Collapsible } from "@/shared/ui/collapsible";
import { SearchOrder } from "@/shared/lib/openapi";
import { ProjectsCardOrderButton } from "./projects-card-order-button";

import styles from "./projects-card.module.scss";
import { clsx } from "clsx";

interface ProjectsCardOrderProps {
  className?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultOrder: SearchOrder;
}

export const ProjectsCardOrder = ({
  className,
  onOpenChange,
  open,
  defaultOrder,
}: ProjectsCardOrderProps) => (
  <Collapsible
    headerText={defaultOrder}
    contentText=""
    floating
    className={clsx(styles.collapsible, className)}
    limit={true}
    onOpenChange={onOpenChange}
    open={open}
  >
    <ButtonGroup direction="vertical">
      {Object.values(SearchOrder).map((order, index) => (
        <ProjectsCardOrderButton key={index} order={order} defaultOrder={defaultOrder} />
      ))}
    </ButtonGroup>
  </Collapsible>
);
