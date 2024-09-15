import { useConvexAuth, useQuery } from "convex/react";
import { useEffect, useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function useStoreUserEffect() {
  const { isLoading: convexLoading, isAuthenticated } = useConvexAuth();
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [isStoring, setIsStoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeUser = useMutation(api.users.store);
  const createRoom = useMutation(api.rooms.createRoom);
  const currUser = useQuery(api.users.getUser);

  const createUserAndRoom = useCallback(async () => {
    if (isStoring) return;
    setIsStoring(true);
    setError(null);

    try {
      console.log("Storing user...");
      const id = await storeUser();
      console.log("User stored with ID:", id);
      setUserId(id);

      const name = currUser?.name ?? "";
      console.log("Creating room for user:", name);
      await createRoom({
        roomName: "AI Therapist",
        patient: name,
        therapist: "AI Therapist",
        notes: [],
      });
      console.log("Room created successfully");
    } catch (err) {
      console.error("Error in createUserAndRoom:", err);
      setError((err as Error).message || "An error occurred");
    } finally {
      setIsStoring(false);
    }
  }, [storeUser, createRoom, currUser]);

  useEffect(() => {
    console.log(
      "useEffect running. isAuthenticated:",
      isAuthenticated,
      "userId:",
      userId
    );
    if (isAuthenticated && !userId && !isStoring) {
      createUserAndRoom();
    }
  }, [isAuthenticated, userId, createUserAndRoom, isStoring]);

  useEffect(() => {
    return () => {
      console.log("Cleanup: setting userId to null");
      setUserId(null);
    };
  }, []);

  const isLoading =
    convexLoading || (isAuthenticated && userId === null) || isStoring;

  console.log("useStoreUserEffect state:", {
    isLoading,
    isAuthenticated,
    userId,
    error,
  });

  return {
    isLoading,
    isAuthenticated: isAuthenticated && userId !== null,
    error,
  };
}
