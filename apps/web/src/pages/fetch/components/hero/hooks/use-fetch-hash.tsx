import { useLocation } from "react-router-dom";

export const useFetchHash = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const hash = query.get("hash");


  return hash;
};
