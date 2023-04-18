import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function useIsMobile() {
  const queryClient = useQueryClient();
  const { data: isMobile }: any = useQuery("is_mobile", () =>
    window.innerWidth <= 600 ? true : false
  );

  useEffect(() => {
    const listenerScreen = () => {
      queryClient.setQueryData(
        "is_mobile",
        window.innerWidth <= 600 ? true : false
      );
    };
    window.addEventListener("resize", listenerScreen);
    return () => {
      window.removeEventListener("resize", listenerScreen);
    };
  }, [queryClient]);

  return { isMobile };
}
