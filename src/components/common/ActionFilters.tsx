import { debouncedValue } from "@/utils/values";
import { Box, Button, MenuItem } from "@mui/material";
import React, { useState } from "react";
import KInput from "../ui/KInput";
import { Clear, Search } from "@mui/icons-material";

type Props = {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      nameSearch?: string;
      gender?: string;
    }>
  >;
  className?: string;
};

const dataGenders = [
  { value: "", label: "--Choose a gender--" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const ActionFilters = ({ setFilters, className = "" }: Props) => {
  const [dataSearch, setDataSearch] = useState<{
    nameAndPhone?: string;
    gender?: string;
  }>({
    nameAndPhone: "",
    gender: "",
  });

  const onSearch = debouncedValue(setFilters, 500);

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
    setDataSearch({ nameAndPhone: "", gender: "" });
  };

  return (
    <Box className={`mb-4 flex gap-4 ${className}`}>
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
      <KInput
        size="small"
        className="min-w-[200px]"
        name={"gender"}
        onChange={handleSearch}
        value={dataSearch?.gender}
        placeholder="Gender"
        label="Gender"
        select
      >
        {dataGenders.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            selected={dataSearch?.gender === item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </KInput>

      <Button onClick={() => handleClearSearch()}>
        <Clear /> Clear
      </Button>
    </Box>
  );
};

export default ActionFilters;
