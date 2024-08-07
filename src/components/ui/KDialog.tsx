import CloseIcon from "@mui/icons-material/Close";
import { IconButton, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface KDialogProps {
  open: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  title?: string;
  onSubmit?: () => void;
  submitText?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const KDialog = ({
  open,
  size = "md",
  title,
  onSubmit,
  children,
  submitText,
  onClose,
}: KDialogProps) => {
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form action={"#"}>
      <BootstrapDialog
        fullWidth={true}
        maxWidth={size}
        open={open}
        onClose={onClose}
      >
        <DialogTitle sx={{ m: 0, p: 2, pb: 0 }}>{title}</DialogTitle>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          {onSubmit && (
          <Button
            type="submit"
            color="primary"
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {submitText ? submitText : "Save changes"}
          </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </form>
  );
};

export default KDialog;
