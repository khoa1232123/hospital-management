import { KDialog, KRenderField, KTable } from "@/components/ui";
import { useMainContext } from "@/contexts";
import { tableVisits, useVisits } from "@/modules/visits";
import { KInputType, OptionsType } from "@/types/field";
import { Box, Button, Grid } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  dataUsers?: OptionsType[];
  dataPatients?: OptionsType[];
  dataDepartments?: OptionsType[];
};

const TabVisits = (props: Props) => {
  const { id } = useParams();

  const { dataUsers, dataPatients } = useMainContext();

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
    setData,
  } = useVisits(
    10,
    {
      allData: true,
    },
    {
      userId: id as string,
    }
  );

  console.log({allData});
  

  useEffect(() => {
    setData((prev: any) => ({
      ...prev,
      userId: id as string,
    }));
  }, [id]);

  return (
    <div>
      <Box className="flex justify-between items-center mb-4">
        <h2 className="m-0">Manage Visits</h2>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </Box>

      <KTable
        loading={loading}
        data={allData}
        moreData={[
          {
            name: "patient",
            data: dataPatients,
          },
          {
            name: "user",
            data: dataUsers,
          },
        ]}
        pagination={pagination}
        keys={tableVisits.filter(
          (item) => item.value !== "userName"
        )}
        onEdit={editVisit}
        onDelete={deleteVisit}
        isAction
      />
      <KDialog
        title="User"
        size="sm"
        open={open}
        onClose={closeForm}
        onSubmit={submitVisit}
      >
        <Grid container spacing={2}>
          {(fieldsForm as KInputType[]).map((props, index) => {
            if (props.name === "userId") props.disabled = true;
            return <KRenderField key={index} {...props} />;
          })}
        </Grid>
      </KDialog>
    </div>
  );
};

export default TabVisits;
