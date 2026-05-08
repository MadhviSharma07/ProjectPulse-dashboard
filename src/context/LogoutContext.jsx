// context/LogoutContext.js
import { createContext, useContext, useState } from "react";

const LogoutContext = createContext();

export function LogoutProvider({ children }) {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <LogoutContext.Provider value={{ showLogout, setShowLogout }}>
      {children}
    </LogoutContext.Provider>
  );
}

export const useLogout = () => useContext(LogoutContext);