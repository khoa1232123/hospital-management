import { KInputType } from "@/types/field";
import { Autocomplete, CircularProgress, Grid, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

type Props = KInputType & {
  onChange?: (value: any) => void;
  onSearch?: (value: any) => void;
  loading?: boolean;
};

const KAutoComplate = ({
  options,
  onSearch,
  loading,
  value,
  onChange,
  name = "",
  xs,
  xl,
  sm,
  md,
  placeholder,
}: Props) => {
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [dataAutoCom, setDataAutoCom] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<any>();

  useEffect(() => {
    if (!options || options.length === 0) return;
    const datas = options.map((data) => {
      if (name === "userId" || name === "patientId") {
        return {
          ...data,
          label:
            data.label +
            " - " +
            data.gender +
            " - " +
            dayjs(data.birthday).format("DD-MM-YYYY"),
        };
      } else {
        return {
          ...data,
          label: data?.name,
        };
      }
    });
    setDataAutoCom(datas);
    setInputValue(datas.find((data) => data.value === value) || "");
  }, [options, value, loading]);

  const deValue = useMemo(() => {
    const idx = dataAutoCom.findIndex((data) => data.value === value);

    return dataAutoCom[idx];
  }, [dataAutoCom.length, value]);

  console.log({ deValue, inputValue });

  return (
    <Grid item xs={xs} xl={xl} sm={sm} md={md}>
      <Autocomplete
        disablePortal
        id="KAutoComplate"
        options={dataAutoCom || []}
        sx={{ width: "100%" }}
        loading={isLoadingSearch || loading}
        value={inputValue ? { ...inputValue } : null}
        onInputChange={(e, value) => {
          setIsLoadingSearch(true);
          onSearch && onSearch({ nameSearch: value.toLowerCase() });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={placeholder}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        onChange={(e, value: any) => {
          onChange &&
            onChange({
              target: {
                name: name,
                value: value ? value.id : "",
              },
            });
        }}
      />
    </Grid>
  );
};

export default KAutoComplate;
