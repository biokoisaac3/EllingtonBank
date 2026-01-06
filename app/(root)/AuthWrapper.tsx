import { Stack, useRouter, useSegments } from "expo-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../lib/store";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { restoreAuth } from "../lib/thunks/authThunks";

export default function AuthWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user, isRestoring } = useAppSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const segments = useSegments();
  const [mounted, setMounted] = useState(false);
  const currentUser = user?.email;

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isRestoring) {
      setMounted(true);
    }
  }, [isRestoring]);

  // useEffect(() => {
  //   if (mounted) {
  //     if (!currentUser) {
  //       router.replace("/");
  //     // } else if (user.status === "bvn_verified") {
  //     //   router.replace("/(auth)/facial-verification");
  //     // } else if (user.status === "otp_verified") {
  //     //   router.replace("/(auth)/profile-update");
  //     } 
  //     else if (!isAuthenticated) {
  //       if (segments[0] !== "(auth)") {
  //         router.replace("/(auth)/current-user");
  //       }
  //     } else if (isAuthenticated) {
  //       if (segments[0] === "(auth)") {
  //         router.replace("/(root)/(tabs)");
  //       }
  //     }
  //   }
  // }, [isAuthenticated, segments, router, mounted, currentUser]);

  if (isRestoring) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
