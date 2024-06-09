"use client";
import ActionFilters from "@/components/common/ActionFilters";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import KTable from "@/components/ui/KTable";
import { tableRooms } from "@/constants";
import { useMainContext } from "@/contexts";
import { useRooms } from "@/hooks/firestore";
import { Box, Button, Grid } from "@mui/material";

type Props = {};

const RoomsPage = (props: Props) => {
  const { dataDepartments } = useMainContext();
  const {
    submitRoom,
    setOpen,
    open,
    closeForm,
    fieldsForm,
    loading,
    allData,
    pagination,
    editRoom,
    deleteRoom,
    setFilters,
    setSortBy,
  } = useRooms(10, {
    allData: true,
  });

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Rooms</h2>
        <Button onClick={() => setOpen(true)}>create Room</Button>
      </Box>
      <ActionFilters
        setFilters={setFilters}
        actions={{
          nameAndPhone: true,
          gender: true,
        }}
      />
      <KTable
        loading={loading}
        data={allData}
        pagination={pagination}
        keys={tableRooms}
        moreData={[
          {
            name: "department",
            data: dataDepartments,
          },
        ]}
        onEdit={editRoom}
        onDelete={deleteRoom}
        onSortBy={setSortBy}
        isAction
      />
      <KDialog
        title="Room"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitRoom}
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

export default RoomsPage;
