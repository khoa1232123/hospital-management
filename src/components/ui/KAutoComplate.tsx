import { KInputType } from "@/types/field";
import { mergeArray } from "@/utils/array";
import { Autocomplete, CircularProgress, Grid, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

type Props = KInputType & {
  onChange?: (value: any) => void;
  onSearch?: (value: any) => void;
  loading?: boolean;
};

const KAutoComplate = ({
  options = [],
  onSearch,
  loading,
  value = '',
  onChange,
  name = "",
  xs,
  xl,
  sm,
  md,
  placeholder,
}: Props) => {
  const [inputBlur, setInputBlur] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [dataAutoCom, setDataAutoCom] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<any>();
  const [countValue, setCountValue] = useState(0);
  const [nameSearch, setNameSearch] = useState('');

  const defConfig = {
    options: options,
  }

  console.log({options});
  

  useEffect(() => {
    onSearch && onSearch({ id: value });
    console.log("abc onSearch", value, name);
    
  }, [value, nameSearch]);

  console.log({nameSearch});

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
    setDataAutoCom(mergeArray([...dataAutoCom,...datas], 'value'));
    setInputValue(datas.find((data: any) => data.value === value) || "");
  }, [options, value, loading]);

  const deValue = useMemo(() => {
    const idx = dataAutoCom.findIndex((data) => data.value === value);

    return dataAutoCom[idx];
  }, [dataAutoCom.length, value]);

  return (
    <Grid item xs={xs} xl={xl} sm={sm} md={md}>
      <Autocomplete
        disablePortal
        id="KAutoComplate"
        // options={dataAutoCom || []}
        // getOptionLabel={option => option.label}
        {...defConfig}
        sx={{ width: "100%" }}
        // loading={isLoadingSearch || loading}
        value={inputValue ? { ...inputValue } : null}
        renderInput={(params) => (
          <TextField
            {...params}
            label={placeholder}
            placeholder={placeholder}
            onChange={(e) => {
              onSearch &&
                onSearch({ nameSearch: e.target.value.toLowerCase() });
                setNameSearch(e.target.value);
            }}
            onBlur={() => {
              setInputBlur(true);
            }}
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
