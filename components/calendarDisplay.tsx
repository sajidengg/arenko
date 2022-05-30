import * as React from "react";
import moment from "moment";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { FormHelperText, Grid, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: "#f44336",
    },
  })
);

const SubHeadingWrapper = styled("div")(
  ({ theme }) => `
      font-size: 1rem;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.00938em;
      margin-top: 16px;
      color: #404141;
      margin-bottom: 10px
    `
);

export interface BasicDateTimePickerProps {
  value: string;
  onChange: (newValue: Date) => void;
  isPast: boolean;
  message: string;
  maximumSubmission: boolean;
  label: string
}

export default function BasicDateTimePicker({ value, onChange, isPast, message, maximumSubmission, label }: BasicDateTimePickerProps) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item sm={12}><div style={{fontWeight: 'bold'}}>{label}</div></Grid>
        <Grid item sm={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              ampm={false}
              renderInput={(props) => <TextField {...props} />}
              disablePast
              value={value}
              views={["year", "month", "day", "hours", "minutes"]}
              onChange={onChange}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item sm={12} style={{paddingTop: 5}}>
        <FormHelperText>
            { isPast ? (
              <span className={classes.error}>{message}</span>
            ) : maximumSubmission ? <span className={classes.error}>{"End Date & time must be before the Maximum Submission Date"}</span> : null}
          </FormHelperText>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
