import { useEffect, useReducer } from "react";

export default function usePersistentReducer(
  reducer,
  initialState,
  storageKey
) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (fallbackState) => {
      try {
        const savedState = localStorage.getItem(storageKey);

        return savedState === null
          ? fallbackState
          : JSON.parse(savedState) ?? fallbackState;
      } catch (error) {
        console.warn("Could not load saved state:", error);
        return fallbackState;
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.warn("Could not save state:", error);
    }
  }, [state, storageKey]);

  return [state, dispatch];
}