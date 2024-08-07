"use client";
import { dataStatus, dataStatusMore } from "@/constants";
import { KeyConfigType, OptionsType } from "@/types/field";
import { convertNumberToArray, getValueData } from "@/utils/array";
import { convertServerTimestamp } from "@/utils/timeDate";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button, CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

interface MoreDataType {
  name: string;
  data: OptionsType[];
}

type KTableProps = {
  data: any[];
  moreData?: MoreDataType[];
  isAction?: boolean;
  actionMaxWidth?: number | string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSortBy?: React.Dispatch<
    React.SetStateAction<{
      [key: string]: "desc" | "asc";
    }>
  >;
  keys: KeyConfigType[];
  pagination?: PaginationProps;
  loading?: boolean;
};

const addMoreData = (
  row: { [key: string]: any },
  moreData: MoreDataType[]
) => {
  moreData &&
    moreData.forEach((moreDataItem) => {
      const key = moreDataItem.name; // Tên key cần thay thế trong docsData

      // Kiểm tra nếu doc có key này và key này có trong moreData
      if (row.hasOwnProperty(key + "Id")) {
        const dataItem =
          moreDataItem.data &&
          moreDataItem.data.find((d) => d.value === row[key + "Id"]);

        // Nếu tìm thấy giá trị phù hợp, thay thế giá trị trong doc
        if (dataItem) {
          row[key + "Name"] = dataItem.label;
        }
      }
    });
};

const KTable = ({
  data,
  onEdit,
  onDelete,
  isAction = false,
  actionMaxWidth = 100,
  keys,
  pagination,
  loading = false,
  onSortBy,
  moreData,
}: KTableProps) => {
  const pathName = usePathname();
  const headerRow: JSX.Element = React.useMemo(
    () => (
      <TableRow>
        {keys.map((keyConfig) => (
          <TableCell
            key={keyConfig.value}
            align={keyConfig.align || "left"}
            style={{ minWidth: keyConfig.width || "auto" }}
          >
            <div
              onClick={() => {
                onSortBy &&
                  onSortBy((prev) => ({
                    [keyConfig.value]:
                      prev[keyConfig.value] === "desc" ? "asc" : "desc",
                  }));
              }}
            >
              {keyConfig.label || keyConfig.value}
            </div>
          </TableCell>
        ))}
        {isAction && (
          <TableCell
            style={{ minWidth: 100, maxWidth: actionMaxWidth || "100%" }}
            width={actionMaxWidth}
            className="sticky right-0 bg-white"
          />
        )}
      </TableRow>
    ),
    [keys]
  );

  const bodyRow = ({
    keyConfig,
    row,
  }: {
    keyConfig: KeyConfigType;
    row: any;
  }) => {
    if (keyConfig.isLink) {
      return (
        <Link href={`/${keyConfig.preLink || pathName}/${row.id}`}>
          {convertServerTimestamp(row[keyConfig.value])}
        </Link>
      );
    }
    if (keyConfig.value === "status") {
      const status = dataStatusMore.find(
        (status) => status.value === row.status
      );

      const timeAppointment = dayjs(row?.appointmentDate).format("DD-MM-YYYY");
      const timeNow = dayjs(Date.now()).format("DD-MM-YYYY");

      if (status && status.value === "pending" && timeAppointment < timeNow) {
        const status = dataStatusMore.find(
          (status) => status.value === "outOfDate"
        );
        return (
          <span
            className={`py-1 px-2 rounded-md`}
            style={{
              background: status?.color || "",
              color: "white",
            }}
          >
            {status?.label}
          </span>
        );
      }

      const color = status ? status.color : "";

      return (
        <span
          className={`py-1 px-2 rounded-md`}
          style={{
            background: color != "" ? `${color}` : "",
            color: color != "yellow" ? "white" : "",
          }}
        >
          {row[keyConfig.value]}
        </span>
      );
    }

    if (keyConfig.value === "appointmentDate") {
      return dayjs(row[keyConfig.value]).format("DD-MM-YYYY");
    }

    return convertServerTimestamp(row[keyConfig.value]);
  };

  const rows: JSX.Element[] = React.useMemo(() => {
    return data.map((row) => {
      moreData && addMoreData(row, moreData);
      return (
        <TableRow hover key={row.id}>
          {keys.map((keyConfig) => (
            <TableCell
              key={keyConfig.value}
              align={keyConfig.align}
              component={keyConfig.component || "td"}
              scope="row"
            >
              {bodyRow({ keyConfig, row })}
            </TableCell>
          ))}
          {isAction && (
            <TableCell align="right" className="px-2 sticky right-0 bg-white">
              <Button
                color="warning"
                onClick={() => onEdit && onEdit(row.id)}
                className="px-2 min-w-[40px] min-h-[40px]"
              >
                <BorderColorIcon color="warning" />
              </Button>
              <Button
                color="error"
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this patient?")
                  ) {
                    onDelete && onDelete(row.id);
                  }
                }}
                className="px-2 min-w-[40px] min-h-[40px]"
              >
                <DeleteForeverIcon color="error" />
              </Button>
            </TableCell>
          )}
        </TableRow>
      );
    });
  }, [data, keys, onEdit, onDelete]);

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "calc(100vh - 240px)" }}
        className="relative"
      >
        <Table
          size="small"
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label="simple table hover"
        >
          <TableHead>{headerRow}</TableHead>
          <TableBody>
            {data.length > 0 ? (
              rows
            ) : (
              <TableRow>
                <TableCell
                  colSpan={isAction ? keys.length + 1 : keys.length}
                  align="center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {loading && (
          <Box className="absolute w-full h-full flex items-center justify-center top-0">
            <CircularProgress />
          </Box>
        )}
      </TableContainer>
      {pagination && (
        <Box mt={4} className="flex items-end justify-end gap-4">
          {convertNumberToArray(pagination?.totalPages || 0).map((item) => (
            <Button
              key={item}
              className={`min-w-[40px] h-[40px] text-white font-bold text-lg ${
                pagination.currentPage === item
                  ? "bg-blue-600 focus:cursor-auto"
                  : "bg-blue-400"
              } hover:bg-blue-600`}
              onClick={() => {
                if (pagination.currentPage != item) {
                  pagination.goToPage(item);
                }
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default KTable;
