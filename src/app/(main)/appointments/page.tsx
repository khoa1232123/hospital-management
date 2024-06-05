"use client";
import { useMainContext } from "@/contexts";
import ActionFilters from "@/components/common/ActionFilters";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tableAppointments } from "@/constants/renderTable";
import {
  useAppointments,
  useDepartments,
  usePatients,
  useUsers,
} from "@/hooks/firestore";
import { Box, Button, Grid } from "@mui/material";

type Props = {};

const AppointmentsPage = (props: Props) => {
  const {
    submitAppointment,
    setOpen,
    open,
    closeForm,
    fieldsForm,
    loading,
    allData,
    data,
    pagination,
    editAppointment,
    deleteAppointment,
    setFilters,
  } = useAppointments(10, {
    allData: true,
  });

  const { dataDepartments, dataPatients, dataUsers } = useMainContext();

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Appointments</h2>
        <Button onClick={() => setOpen(true)}>Create Appointment</Button>
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
        moreData={[
          {
            name: "user",
            data: dataUsers,
          },
          {
            name: "department",
            data: dataDepartments,
          },
          {
            name: "patient",
            data: dataPatients,
          },
        ]}
        pagination={pagination}
        keys={tableAppointments}
        onEdit={editAppointment}
        onDelete={deleteAppointment}
        isAction
      />
      <KDialog
        title={data?.id ? "Update Appointment" : "Create Appointment"}
        submitText={data?.id ? "Update" : "Create"}
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitAppointment}
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

export default AppointmentsPage;
