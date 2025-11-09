import { deleteRating } from "@/_lib/projects/delete-rating";
import { postRating } from "@/_lib/projects/post-rating";

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
