import { useDepartments } from "@/modules/departments";
import { usePatients } from "@/modules/patients";
import { useUsers } from "@/modules/users";
import { OptionsType } from "@/types/field";
import { createContext, useContext } from "react";

interface MainContextProps {
  dataDepartments: OptionsType[];
  dataUsers: OptionsType[];
  dataPatients: OptionsType[];
}

type MainProviderProps = {
  children: React.ReactNode;
};

const MainContext = createContext<MainContextProps>({} as MainContextProps);

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainProvider = ({ children }: MainProviderProps) => {
  const { dataSelected: dataPatients } = usePatients(10, {
    dataSelected: true,
  });

  const { dataSelected: dataUsers } = useUsers(
    10,
    { dataSelected: true },
    { role: "user" }
  );

  const { dataSelected: dataDepartments } = useDepartments(10, {
    dataSelected: true,
  });

  const value = { dataPatients, dataUsers, dataDepartments };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
