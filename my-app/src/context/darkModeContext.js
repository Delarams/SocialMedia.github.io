import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) ?? false // ✅ Ensure boolean type
  );

  const toggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode)); // ✅ Update localStorage immediately
      return newMode;
    });
  };

  useEffect(() => {
    document.body.className = darkMode ? "theme-dark" : "theme-light"; // ✅ Apply class dynamically
  }, [darkMode]); // ✅ Re-run on darkMode changes

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
