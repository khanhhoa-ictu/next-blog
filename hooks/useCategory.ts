import { CATEGORY } from "../common";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";

const initCategory = {
  category: CATEGORY.HTML_CSS,
  page: 1,
};
export default function useCategory() {
  const queryClient = useQueryClient();
  const { data: category } = useQuery("category", () => initCategory, {
    enabled: false,
  });
  const setCategory = useCallback(
    (data: any) => {
      queryClient.setQueryData("category", () => data);
    },
    [queryClient]
  );
  return { category: category || initCategory, setCategory };
}
