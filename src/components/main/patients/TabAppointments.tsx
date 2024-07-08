import { useMainContext } from "@/contexts";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tablePatientTabAppointments } from "@/constants";
import { Button, Grid } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { tableAppointments, useAppointments } from "@/modules/appointments";

type Props = {};

const TabAppointments = ({}: Props) => {
  const { id } = useParams();

  const { dataDepartments, dataUsers } = useMainContext();

  const {
    allData: dataAppointments,
    loading,
    pagination,
    deleteAppointment,
    editAppointment,
    fieldsForm,
    open,
    closeForm,
    submitAppointment,
    setOpen,
    setData,
  } = useAppointments(100, { allData: true }, { patientId: id as string });

  useEffect(() => {
    setData((prev: any) => ({
      ...prev,
      patientId: id as string,
    }));
  }, [id]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="m-0">History Appointments</h2>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </div>
      <KTable
        loading={loading}
        data={dataAppointments}
        moreData={[
          {
            name: "department",
            data: dataDepartments,
          },
          {
            name: "user",
            data: dataUsers,
          },
        ]}
        pagination={pagination}
        keys={tableAppointments.filter((item) => item.value !== "patientName")}
        onEdit={editAppointment}
        onDelete={deleteAppointment}
        isAction
      />
      <KDialog
        title="Patient"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitAppointment}
      >
        <Grid container spacing={2}>
          {fieldsForm.map((props, index) => {
            if (props.name === "patientId") props.disabled = true;
            return <KRenderField key={index} {...props} />;
          })}
        </Grid>
      </KDialog>
    </>
  );
};

export default TabAppointments;
