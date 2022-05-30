import { Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export interface levelInputProps {
  text: string;
  label: string;
  value: string;
  helperText: string;
  error: boolean;
  placeholder: string;
  InputProps: {
    inputProps: {
        min: number;
        max: number;
    };
}
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formInputs: {
      display: "flex",
      flexDirection: "column",
    },
    subHeading: {
      marginTop: 10,
      color: "#404141",
    },
    input: {
      width: "100%",
      '& label.Mui-focused': {
        color: '#007070',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#007070',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#007070',
        },
      },
    },
    bodFields: {
      marginRight: 15
    },
    dynamicFields: {
      marginRight: 0
    }
  })
);

const levelInput: React.SFC<levelInputProps> = ({text, label, value, helperText, error, handleChange, placeholder, InputProps}: levelInputProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} className={classes.bodFields}>
      <div className={classes.formInputs}>
        <Typography variant="body1" className={classes.subHeading}>
          {text}
        </Typography>
        <TextField
          variant="outlined"
          placeholder={placeholder}
          className={classes.input}
          id={label}
          name={label}
          type="number"
          InputProps={InputProps}
          value={value}
          onChange={handleChange}
          error={error}
          helperText={helperText}
          autoComplete="off"
        />
      </div>
    </Grid>
  );
};

export default levelInput;
