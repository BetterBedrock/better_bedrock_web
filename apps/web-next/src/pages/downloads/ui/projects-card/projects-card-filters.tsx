"use client";

import { useState } from "react";
import { ProjectsCardSearchBar } from "./projects-card-search-bar";
import { ProjectsCardType } from "./projects-card-type";
import { ProjectsCardOrder } from "./projects-card-order";

import styles from "./projects-card.module.scss";
import { ProjectType, SearchOrder } from "@/shared/lib/openapi";

interface ProjectsCardFiltersProps {
  defaultOrder: SearchOrder;
  defaultSearch: string;
  defaultType?: ProjectType;
}

export const ProjectsCardFilters = ({
  defaultOrder,
  defaultType,
  defaultSearch,
}: ProjectsCardFiltersProps) => {
  const [typeOpen, setTypeOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  const handleTypeOpenChange = (isOpen: boolean) => {
    setTypeOpen(isOpen);
    setOrderOpen(false);
  };

  const handleOrderOpenChange = (isOpen: boolean) => {
    setTypeOpen(false);
    setOrderOpen(isOpen);
  };

  return (
    <>
      <ProjectsCardSearchBar defaultSearch={defaultSearch} defaultOrder={defaultOrder} />
      <ProjectsCardType
        onOpenChange={handleTypeOpenChange}
        open={typeOpen}
        defaultType={defaultType}
      />
      <ProjectsCardOrder
        className={styles.orderFull}
        onOpenChange={handleOrderOpenChange}
        open={orderOpen}
        defaultOrder={defaultOrder}
      />
    </>
  );
};
