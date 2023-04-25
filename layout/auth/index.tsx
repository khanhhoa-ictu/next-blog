import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useProfile from "../../hooks/useProfile";

interface AuthProps {
  children: any;
}
function Auth({ children }: AuthProps) {
  const router = useRouter();
  const isAuthenticated = !!Cookies.get("token");
  const { profile, firstLoading } = useProfile(true);
  useEffect(() => {
    console.log(profile?.username);
    if (!firstLoading && !profile?.username) router.push("/login");
  }, [profile, router]);

  return <div>{children}</div>;
}

export default Auth;
