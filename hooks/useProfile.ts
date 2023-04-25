import { getProfile } from "../api-client/profile";
import { useQuery } from "react-query";

export default function useProfile(enabled = false) {
  const { data: profile, refetch: refetchProfile } = useQuery<any>(
    "profile",
    getProfile,
    { enabled }
  );
  const firstLoading = profile === undefined;
  return { profile, refetchProfile, firstLoading };
}
