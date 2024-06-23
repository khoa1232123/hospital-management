"use client";
import { ActionFilters } from "@/components/common";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { useMainContext } from "@/contexts";
import {
  tableBedAssignments,
  useBedAssignments,
} from "@/modules/bedAssignments";
import { useRooms } from "@/modules/rooms";
import { Box, Button, Grid } from "@mui/material";
import { useParams } from "next/navigation";

type Props = {};

const RoomSinglePage = (props: Props) => {
  const { id } = useParams();
  const { dataPatients } = useMainContext();

  const {
    submitBedAssignment,
    setOpen,
    open,
    closeForm,
    fieldsForm,
    loading,
    allData,
    pagination,
    editBedAssignment,
    deleteBedAssignment,
    setFilters,
    setSortBy,
  } = useBedAssignments(10);

  const { data: room } = useRooms(1, {
    docId: id as string,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={3}>
        <h1>Room: {room?.name}</h1>
        <p>Type: {room?.type}</p>
        <p>{room?.departmentId}</p>
      </Grid>
      <Grid item xs={8} md={9}>
        <div>
          <Box className="flex justify-between items-center mb-4">
            <h2 className="m-0">Manage Bed Assignments</h2>
            <Button onClick={() => setOpen(true)}>Create</Button>
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
            keys={tableBedAssignments}
            moreData={[
              {
                name: "patient",
                data: dataPatients,
              },
            ]}
            onEdit={editBedAssignment}
            onDelete={deleteBedAssignment}
            onSortBy={setSortBy}
            isAction
          />
          <KDialog
            title={"Room " + room?.name}
            size="sm"
            open={open}
            onClose={closeForm}
            onSubmit={submitBedAssignment}
          >
            <Grid container spacing={2}>
              {fieldsForm.map((props, index) => (
                <KRenderField key={index} {...props} />
              ))}
            </Grid>
          </KDialog>
        </div>
      </Grid>
    </Grid>
  );
};

export default RoomSinglePage;
