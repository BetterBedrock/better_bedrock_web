import { deleteRating } from "@/entities/project/api/delete-rating";
import { postRating } from "@/entities/project/api/post-rating";

export const manageRating = async (id: string) => {
  async function handleReset() {
    "use server";
    await deleteRating(id);
  }

  async function handleUpdate(rating: number) {
    "use server";
    await postRating(id, rating);
  }

  return { handleReset, handleUpdate };
};
