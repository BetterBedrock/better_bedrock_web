"use client";

import { deleteRating, postRating } from "@/entities/project";
import { Rating } from "@/shared/ui/rating";

import styles from "./project-rate-project.module.scss";

interface ProjectRateRatingProps {
  id: string;
  userRating: number;
}

export const ProjectRateRating = ({
  id,
  userRating,
}: ProjectRateRatingProps) => {
  const handleReset = async () => {
    await deleteRating(id);
  };

  const handleUpdate = async (rating: number) => {
    await postRating(id, rating);
  };

  return (
    <Rating
      rating={userRating}
      onReset={handleReset}
      onUpdate={handleUpdate}
      className={styles.rating}
      extraClassName={styles.tooltip}
      selectable={true}
      size="medium"
    />
  );
};
