import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function useIsMobile() {
  const queryClient = useQueryClient();
  const { data: isMobile }: any = useQuery("is_mobile", () => {
    let isMobiles = true;
    if (typeof window !== "undefined") {
      isMobiles = window.innerWidth <= 600 ? true : false;
    }
    return isMobile;
  });

  useEffect(() => {
    const listenerScreen = () => {
      let isMobiles = true;
      if (typeof window !== "undefined") {
        isMobiles = window.innerWidth <= 600 ? true : false;
      }
      queryClient.setQueryData("is_mobile", isMobile);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", listenerScreen);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", listenerScreen);
      }
    };
  }, [queryClient]);

  return { isMobile };
}
