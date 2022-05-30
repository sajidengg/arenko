import * as React from "react";
import { makeStyles, createStyles, withStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Typography, TextField, InputAdornment, Grid, Tooltip } from "@mui/material";
import { TooltipProps } from '@mui/material';
import ReportProblemOutlined from '@mui/icons-material/ReportProblemOutlined';

export interface priceInputProps {
  text: string;
  label: string;
  value: string;
  helperText: string;
  error: boolean;
  placeholder: string;
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

const priceInput: React.SFC<priceInputProps> = ({text, label, value, helperText, error, handleChange, placeholder}: priceInputProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} style={{marginRight: 15, marginLeft: 15}}>
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
                      <Typography color="inherit">To submit BOD offer/bid price {">"}= -99999 and {"<"}= 99999</Typography>
                    </React.Fragment>
                  }
                >
                  <ReportProblemOutlined style={{fill: '#959595'}} />
                </HtmlTooltip>
              </InputAdornment>
            ),
          } : null}
        />
      </div>
    </Grid>
  );
};

export default priceInput;
