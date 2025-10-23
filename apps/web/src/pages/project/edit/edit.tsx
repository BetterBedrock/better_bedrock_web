import {
  Actions,
  Description,
  DetailsEditor,
  DownloadButton,
  Header,
  Thumbnail,
} from "~/pages/project/components";
import { useEditAccess } from ".";

export const Edit = () => {
  const { hasAccess } = useEditAccess();

  if (!hasAccess) {
    return null;
  }

  return (
    <>
      <Header mode="edit" />
      <DownloadButton />
      <DetailsEditor />
      <Thumbnail />
      <Description mode="edit" />
      <Actions />
    </>
  );
};
