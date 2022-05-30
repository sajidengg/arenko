import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      width: '100%',
      background: '#2e7d32',
      color: '#fff',
      '& svg.MuiSvgIcon-root': {
        color: '#fff'
      }
    },
  })
);

export interface SuccessProps {
  open: boolean;
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Success: React.SFC<SuccessProps> = ({ open, message, setOpen }: SuccessProps) => {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}>
        <Alert severity="success" className={classes.alert}>
          {message}
        </Alert>
    </Snackbar>
  );
};

export default Success;
