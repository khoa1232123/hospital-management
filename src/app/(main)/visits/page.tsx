"use client";
import { ActionFilters } from "@/components/common";
import { KDialog, KRenderField, KTable } from "@/components/ui";
import { useMainContext } from "@/contexts";
import { tableVisits, useVisits } from "@/modules/visits";
import { KInputType } from "@/types/field";
import { Box, Button, Grid } from "@mui/material";

type Props = {};

const VisitPage = (props: Props) => {
  const { dataPatients, dataUsers } = useMainContext();
  useMainContext();
  const {
    fieldsForm,
    open,
    allData,
    pagination,
    loading,
    setOpen,
    closeForm,
    deleteVisit,
    submitVisit,
    editVisit,
    setFilters,
  } = useVisits(10, {
    allData: true,
  });

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Visits</h2>
        <Button onClick={() => setOpen(true)}>create</Button>
      </Box>

      <ActionFilters
        setFilters={setFilters}
        actions={{
          nameAndPhone: true,
          gender: true,
          clearBtn: true,
        }}
      />
      <KTable
        loading={loading}
        data={allData}
        moreData={[
          {
            data: dataUsers,
            name: "user",
          },
          {
            data: dataPatients,
            name: "patient",
          },
        ]}
        pagination={pagination}
        keys={tableVisits}
        onEdit={editVisit}
        onDelete={deleteVisit}
        isAction
      />
      <KDialog
        title="Visit"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitVisit}
      >
        <Grid container spacing={2}>
          {(fieldsForm as KInputType[]).map((props, index) => (
            <KRenderField key={index} {...props} />
          ))}
        </Grid>
      </KDialog>
    </div>
  );
};

export default VisitPage;
