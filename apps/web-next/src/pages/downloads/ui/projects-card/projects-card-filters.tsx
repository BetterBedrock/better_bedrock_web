"use client";

import { useState } from "react";
import { ProjectsCardSearchBar } from "./projects-card-search-bar";
import { ProjectsCardType } from "./projects-card-type";
import { ProjectsCardOrder } from "./projects-card-order";

import styles from "./projects-card.module.scss";

export const ProjectsCardFilters = () => {
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
      <ProjectsCardSearchBar />
      <ProjectsCardType
        onOpenChange={handleTypeOpenChange}
        open={typeOpen}
      />
      <ProjectsCardOrder
        className={styles.orderFull}
        onOpenChange={handleOrderOpenChange}
        open={orderOpen}
      />
    </>
  );
};
