"use client";
import TestTable from "@/components/TestTable";
import KTable from "@/components/ui/KTable";
import { tableUsers } from "@/constants/renderTable";
import { useUser } from "@/hooks/firestore";
import React, { useEffect } from "react";

type Props = {};

const UsersPage = (props: Props) => {
  const {
    addUser,
    fieldsForm,
    open,
    setOpen,
    getUsers,
    allData,
    goToPage,
    totalPages,
    headerData,
    rowsData,
  } = useUser(2, true);

  console.log({ allData });

  return (
    <div>
      {/* <TestTable theader={headerData} tbody={rowsData} /> */}
      <KTable data={allData} keys={tableUsers} />
    </div>
  );
};

export default UsersPage;
