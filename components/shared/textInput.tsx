import React from "react";
import { makeStyles, createStyles, withStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Typography, TextField, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formInputs: {
      display: "flex",
      flexDirection: "row",
    },
    subHeading: {
      marginTop: 16,
      color: "#404141",
      marginRight: 15,
      width: "14%",
      fontWeight: 'bold'
    },
    error: {
      color: "#f44336",
      marginLeft: 10,
      fontSize: 12,
    },
    symbol: {
      fontWeight: 500,
      marginTop: 18,
      marginLeft: 15,
    },
    desc: {
      width: "100%",
      marginLeft: 20,
      "& label.Mui-focused": {
        color: "#959595",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#959595",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#959595",
        },
      },
    },
    input: {
      width: "100%",
      marginTop: 5,
      "& label.Mui-focused": {
        color: "#959595",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#959595",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#959595",
        },
      },
    },
  })
);

export interface TextInputProps {
  text: string;
  label: string;
  value: string;
  placeholder: string;
  error: any;
  errorMessage: string | undefined;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

const TextInput: React.SFC<TextInputProps> = ({
  text,
  label,
  value,
  handleChange,
  placeholder,
  errorMessage,
    error
}: TextInputProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12}>
      <div className={classes.formInputs}>
        <Grid container spacing={3}>
          <Grid item sm={3}>
            <Typography variant="body1" className={classes.subHeading}>
              {text}
            </Typography>
          </Grid>
          <Grid item sm={8}>
            <TextField
              variant="outlined"
              placeholder={placeholder}
              className={classes.input}
              id={label}
              name={label}
              type="text"
              value={value}
              onChange={handleChange}
              error={error}
            />
            <div className={classes.error}>{errorMessage}</div>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default TextInput;
