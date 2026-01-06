import { Stack, useRouter, useSegments } from "expo-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../lib/store";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { restoreAuth } from "../lib/thunks/authThunks";

export default function AuthWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isRestoring } = useAppSelector(
    (state: RootState) => state.auth
  );

  const router = useRouter();
  const segments = useSegments();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isRestoring) {
      setReady(true);
    }
  }, [isRestoring]);

  useEffect(() => {
    if (!ready) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(root)/(tabs)");
    }
  }, [ready, isAuthenticated, segments, router]);

  if (!ready) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
