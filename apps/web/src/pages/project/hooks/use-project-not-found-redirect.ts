import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "~/providers/notification";
import { Routes } from "~/utils/routes";

export const useProjectNotFoundRedirect = (notFound: boolean) => {
  const navigate = useNavigate();
  const { throwError } = useNotification();

  useEffect(() => {
    if (notFound) {
      navigate(Routes.HOME);
      throwError(null, "Project with this id does not exist");
    }
  }, [notFound]);
};