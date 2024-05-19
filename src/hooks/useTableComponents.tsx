import { KeyConfigType } from "@/types/field";
import { TableCell, TableRow } from "@mui/material";

const useTableComponents = (data: any[], keys: KeyConfigType[]) => {
  const headerRow: JSX.Element = (
    <TableRow>
      {keys.map((keyConfig) => (
        <TableCell
          key={keyConfig.name}
          align={keyConfig.align || "left"}
          width={keyConfig.width || "auto"}
        >
          {keyConfig.name}
        </TableCell>
      ))}
    </TableRow>
  );

  if (data.length === 0) {
    const noDataRow: JSX.Element = (
      <TableRow>
        <TableCell colSpan={keys.length} align="center">
          No data available
        </TableCell>
      </TableRow>
    );
    return { headerRow, rows: [noDataRow] };
  }

  const rows: JSX.Element[] = data.map((row) => (
    <TableRow key={row.id}>
      {keys.map((keyConfig) => (
        <TableCell
          key={keyConfig.name}
          align={keyConfig.align}
          component={keyConfig.component || "td"}
          scope="row"
        >
          {row[keyConfig.name]}
        </TableCell>
      ))}
    </TableRow>
  ));

  return { headerRow, rows };
};

export default useTableComponents;
