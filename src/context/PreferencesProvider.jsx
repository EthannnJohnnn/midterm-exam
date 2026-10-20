import { useState } from "react";
import { PreferencesContext } from "./PreferencesContext.js";

export default function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(16);

  function toggleTheme() {
    setTheme((previousTheme) =>
      previousTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        fontSize,
        toggleTheme,
        setFontSize,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}