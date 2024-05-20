"use client";
import TestTable from "@/components/TestTable";
import { KDialog } from "@/components/ui";
import KRenderField from "@/components/ui/KRenderField";
import { DATATABLES } from "@/constants";
import { useFirestore, useUser } from "@/hooks/firestore";
import { convertNumberToArray } from "@/utils/array";
import { Button, Grid } from "@mui/material";
import { useEffect } from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  return <div>Dashboard</div>;
};

export default DashboardPage;
