"use client";
import { KDialog } from "@/components/ui";
import KInput from "@/components/ui/KInput";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tablePatients } from "@/constants/renderTable";
import { usePatients } from "@/hooks/firestore";
import { debouncedValue } from "@/utils/values";
import { Box, Button, Grid, MenuItem } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const dataGenders = [
  { value: "", label: "--Choose a value--" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const PatientsPage = (props: Props) => {
  const {
    submitPatient,
    setOpen,
    open,
    closeForm,
    fieldsForm,
    loading,
    allData,
    pagination,
    deletePatient,
    getPatientById,
    setFilters,
  } = usePatients(10, true);

  const [dataSearch, setDataSearch] = useState<{
    nameSearch?: string;
    gender?: string;
  }>();

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
    setFilters((prev) => ({ ...prev, nameSearch: "", gender: "" }));
    setDataSearch({ nameSearch: "", gender: "" });
    console.log("afasdfasdfasdf");
  };

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Patients</h2>
        <Button onClick={() => setOpen(true)}>create patient</Button>
      </Box>
      <Box>
        <form className="flex gap-4">
          <KInput
            name="nameSearch"
            onChange={handleSearch}
            value={dataSearch?.nameSearch}
            type="text"
            label="Search"
            size="small"
            className="w-[200px]"
          />
          <KInput
            size="small"
            className="min-w-[200px]"
            name={"gender"}
            onChange={handleSearch}
            value={dataSearch?.gender}
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

          <Button onClick={() => handleClearSearch()}>Clear Search</Button>
        </form>
      </Box>
      <KTable
        loading={loading}
        data={allData}
        pagination={pagination}
        keys={tablePatients}
        onEdit={(id) => {
          getPatientById(id);
          setOpen(true);
        }}
        onDelete={deletePatient}
        isAction
      />
      <KDialog
        title="Patient"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitPatient}
      >
        <Grid container spacing={2}>
          {fieldsForm.map((props, index) => (
            <KRenderField key={index} {...props} />
          ))}
        </Grid>
      </KDialog>
    </div>
  );
};

export default PatientsPage;
