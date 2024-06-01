"use client";
import ActionFilters from "@/components/common/ActionFilters";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tableDepartments } from "@/constants/renderTable";
import { useDepartments } from "@/hooks/firestore";
import { Box, Button, Grid } from "@mui/material";

type Props = {};

const DepartmentsPage = (props: Props) => {
  const {
    submitDepartment,
    setOpen,
    open,
    closeForm,
    fieldsForm,
    loading,
    allData,
    data,
    pagination,
    editDepartment,
    deleteDepartment,
    setFilters,
    setSortBy,
  } = useDepartments(10, {
    allData: true,
  });

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Departments</h2>
        <Button onClick={() => setOpen(true)}>Create Department</Button>
      </Box>
      <ActionFilters
        setFilters={setFilters}
        actions={{
          nameSearch: true,
        }}
      />
      <KTable
        loading={loading}
        data={allData}
        pagination={pagination}
        keys={tableDepartments}
        onEdit={editDepartment}
        onDelete={deleteDepartment}
        onSortBy={setSortBy}
        isAction
      />
      <KDialog
        title={data?.id ? "Update Department" : "Create Department"}
        submitText={data?.id ? "Update" : "Create"}
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitDepartment}
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

export default DepartmentsPage;
