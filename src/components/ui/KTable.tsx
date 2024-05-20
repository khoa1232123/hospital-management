"use client";
import { KeyConfigType } from "@/types/field";
import { convertNumberToArray } from "@/utils/array";
import { convertServerTimestamp } from "@/utils/timeDate";
import { Box, Button, CircularProgress, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

type KTableProps = {
  data: any[];
  isAction?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  keys: KeyConfigType[];
  pagination?: PaginationProps;
  loading?: boolean;
};

const KTable = ({
  data,
  onEdit,
  onDelete,
  isAction = false,
  keys,
  pagination,
  loading = false,
}: KTableProps) => {
  const headerRow: JSX.Element = React.useMemo(
    () => (
      <TableRow>
        {keys.map((keyConfig) => (
          <TableCell
            key={keyConfig.value}
            align={keyConfig.align || "left"}
            width={keyConfig.width || "auto"}
          >
            {keyConfig.label || keyConfig.value}
          </TableCell>
        ))}
        {isAction && <TableCell />}
      </TableRow>
    ),
    [keys]
  );

  const rows: JSX.Element[] = React.useMemo(() => {
    return data.map((row) => (
      <TableRow key={row.id}>
        {keys.map((keyConfig) => (
          <TableCell
            key={keyConfig.value}
            align={keyConfig.align}
            component={keyConfig.component || "td"}
            scope="row"
          >
            {convertServerTimestamp(row[keyConfig.value])}
          </TableCell>
        ))}
        {isAction && (
          <TableCell>
            <Button
              onClick={() => {
                onEdit && onEdit(row.id || "");
              }}
            >
              edit
            </Button>
            <Button onClick={() => onDelete && onDelete(row.id)}>delete</Button>
          </TableCell>
        )}
      </TableRow>
    ));
  }, [data, keys, onEdit, onDelete]);

  return (
    <Box>
      <TableContainer component={Paper} className="relative">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
