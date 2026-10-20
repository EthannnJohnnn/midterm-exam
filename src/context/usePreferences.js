import { useContext } from "react";
import { PreferencesContext } from "./PreferencesContext.js";

export default function usePreferences() {
  const context = useContext(PreferencesContext);

  if (context === null) {
    throw new Error(
      "usePreferences must be used inside PreferencesProvider."
    );
  }

  return context;
}