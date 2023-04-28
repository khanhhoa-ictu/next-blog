import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useProfile from "../../hooks/useProfile";

interface AuthProps {
  children: any;
}
function Auth({ children }: AuthProps) {
  const { profile } = useProfile(true);

  return <div>{children}</div>;
}

export default Auth;
