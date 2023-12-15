import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [navigationDrawerOpen, setNavigationDrawerOpen] = useState(false);

  const openNavigationDrawer = () => {
    setNavigationDrawerOpen(true);
  };

  const closeNavigationDrawer = () => {
    setNavigationDrawerOpen(false);
  };

  return (
    <NavigationContext.Provider
      value={{
        navigationDrawerOpen,
        openNavigationDrawer,
        closeNavigationDrawer,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationDrawer = () => {
  return useContext(NavigationContext);
};
