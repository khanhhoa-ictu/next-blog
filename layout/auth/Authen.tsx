import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useProfile from "../../hooks/useProfile";

interface AuthProps {
  children: ReactNode;
}
function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useProfile(true);

  useEffect(() => {
    if (firstLoading) return;
    if (profile?.role !== "admin") {
      router.push("/");
    }
  }, [profile]);
  return <div>{children}</div>;
}

export default Auth;
