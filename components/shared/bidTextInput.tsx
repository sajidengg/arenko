import * as React from "react";
import { makeStyles, createStyles, withStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Typography, TextField, InputAdornment, Grid, Tooltip } from "@mui/material";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { TooltipProps } from '@mui/material';

export interface levelInputProps {
  text: string;
  label: string;
  value: string;
  helperText: string;
  error: boolean;
  errorMessage: string;
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
    error: {
      color: "#f44336",
      marginLeft: 10,
      fontSize: 12
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
  })
);

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: 'bold',
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const levelInput: React.SFC<levelInputProps> = ({text, label, value, helperText, error, handleChange, errorMessage }: levelInputProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6}>
      <div className={classes.formInputs}>
        <Typography variant="body1" className={classes.subHeading}>
          {text}
        </Typography>
        <TextField
          variant="outlined"
          placeholder=" - Value in MW"
          className={classes.input}
          id={label}
          name={label}
          type="number"
          value={value}
          onChange={handleChange}
          error={error}
          helperText={helperText}
          InputProps={ error ? {
            endAdornment: (
              <InputAdornment position="end">
                <HtmlTooltip
                  placement="top"
                  title={
                    <React.Fragment>
                      <Typography color="inherit">To submit BID value must be {">"}= -9999 and {"<"}= 0.</Typography>
                    </React.Fragment>
                  }
                >
                  <ReportProblemOutlinedIcon style={{fill: '#959595'}} />
                </HtmlTooltip>
              </InputAdornment>
            ),
          } : null}
        />
      </div>
      <div className={classes.error}>{errorMessage}</div>
    </Grid>
  );
};

export default levelInput;
