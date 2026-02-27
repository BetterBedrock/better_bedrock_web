"use client";

import { useState } from "react";
import { ProjectsCardSearchBar } from "./projects-card-search-bar";
import { ProjectsCardType } from "./projects-card-type";
import { ProjectsCardOrder } from "./projects-card-order";

import styles from "./projects-card.module.scss";

export const ProjectsCardFilters = () => {
  const [typeCloseTrigger, setTypeCloseTrigger] = useState(0);
  const [orderCloseTrigger, setOrderCloseTrigger] = useState(0);

  const handleTypeOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setOrderCloseTrigger((prev) => prev + 1);
    }
  };

  const handleOrderOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setTypeCloseTrigger((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.filters}>
      <ProjectsCardSearchBar />
      <ProjectsCardType
        onOpenChange={handleTypeOpenChange}
        closeTrigger={typeCloseTrigger}
      />
      <ProjectsCardOrder
        className={styles.orderFull}
        onOpenChange={handleOrderOpenChange}
        closeTrigger={orderCloseTrigger}
      />
    </div>
  );
};