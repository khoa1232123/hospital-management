import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface LayoutContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

type LayoutProviderProps = {
  children: React.ReactNode;
};

const LayoutContext = createContext<LayoutContextProps>(
  {} as LayoutContextProps
);

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const value = { openSidebar, setOpenSidebar, toggleSidebar };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
