import { debouncedValue } from "@/utils/values";
import { Box, Button, MenuItem } from "@mui/material";
import React, { useState } from "react";
import KInput from "../ui/KInput";
import { Clear, Search } from "@mui/icons-material";
import { FilterType } from "@/types/firebaseHook";
import { dataGender } from "@/constants";

const initDataSearch = {
  nameSearch: "",
  nameAndPhone: "",
  gender: "",
  phone: "",
};

type DataSearchType = {
  nameSearch?: string;
  phone?: string;
  nameAndPhone?: string;
  gender?: string;
};

type Props = {
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
  className?: string;
  actions?: {
    nameAndPhone?: boolean;
    nameSearch?: boolean;
    phone?: boolean;
    gender?: boolean;
    clearBtn?: boolean;
  };
};

const ActionFilters = ({
  setFilters,
  className = "",
  actions = {
    gender: false,
    nameAndPhone: false,
    phone: false,
    nameSearch: false,
    clearBtn: false,
  },
}: Props) => {
  const [dataSearch, setDataSearch] = useState<DataSearchType>(initDataSearch);

  const onSearch = debouncedValue(setFilters, 700);

  const handleSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    onSearch((prev) => ({ ...prev, [name]: value.toLowerCase() }));
    setDataSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearSearch = () => {
    onSearch({ nameSearch: "", gender: "" });
    setDataSearch(initDataSearch);
  };

  return (
    <Box className={`mb-4 flex gap-4 ${className}`}>
      {actions.nameSearch && (
        <KInput
          name="nameSearch"
          onChange={handleSearch}
          value={dataSearch?.nameSearch}
          type="text"
          placeholder="Search Name"
          label="Search Name"
          size="small"
          className="w-[200px]"
          InputProps={{
            endAdornment: <Search />,
            style: {
              paddingRight: "8px",
            },
          }}
        />
      )}
      {actions.phone && (
        <KInput
          name="phone"
          onChange={handleSearch}
          value={dataSearch?.phone}
          type="text"
          placeholder="Search Phone"
          label="Search Phone"
          size="small"
          className="w-[200px]"
          InputProps={{
            endAdornment: <Search />,
            style: {
              paddingRight: "8px",
            },
          }}
        />
      )}
      {actions.nameAndPhone && (
        <KInput
          name="nameAndPhone"
          onChange={handleSearch}
          value={dataSearch?.nameAndPhone}
          type="text"
          placeholder="Search"
          label="Search"
          size="small"
          className="w-[200px]"
          InputProps={{
            endAdornment: <Search />,
            style: {
              paddingRight: "8px",
            },
          }}
        />
      )}
      {actions.gender && (
        <KInput
          size="small"
          type="text"
          className="min-w-[200px]"
          name={"gender"}
          onChange={handleSearch}
          value={dataSearch?.gender}
          placeholder="Gender"
          label="Gender"
          select={true}
        >
          {dataGender.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              selected={dataSearch?.gender === item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </KInput>
      )}
      {actions.clearBtn && (
        <Button onClick={() => handleClearSearch()}>
          <Clear /> Clear
        </Button>
      )}
    </Box>
  );
};

export default ActionFilters;
