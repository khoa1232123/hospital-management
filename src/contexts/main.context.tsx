import useAuth from "@/hooks/useAuth";
import { useDepartments } from "@/modules/departments";
import { usePatients } from "@/modules/patients";
import { useRooms } from "@/modules/rooms";
import { useUsers } from "@/modules/users";
import { OptionsType } from "@/types/field";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

interface MainContextProps {
  dataDepartments: OptionsType[];
  dataUsers: OptionsType[];
  dataPatients: OptionsType[];
  dataRooms: OptionsType[];
  getLabelById: (id: string) => string;
}

type MainProviderProps = {
  children: React.ReactNode;
};

const MainContext = createContext<MainContextProps>({} as MainContextProps);

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainProvider = ({ children }: MainProviderProps) => {
  const { user, isPageLoading } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (!isPageLoading && !user) {
      route.push("/signin");
    }
  }, [user, isPageLoading]);

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

  const { dataSelected: dataRooms } = useRooms(10, {
    dataSelected: true,
  });

  const getLabelById = (id: string) => {
    if (!id) return "";
    const item = [
      ...dataPatients,
      ...dataUsers,
      ...dataDepartments,
      ...dataRooms,
    ].find((item) => item.value === id);
    return item?.label ?? "";
  };

  const value = { dataPatients, dataUsers, dataDepartments, dataRooms, getLabelById };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
