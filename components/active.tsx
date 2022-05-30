import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Link, styled } from "@mui/material";
import AssetDisplay from "./assetDisplay";
import CalendarDisplay from "./calendarDisplay";
import TextInput from "./shared/textInput";
import Success from "./success";
import ActiveTable from "./shared/activeTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "10px 10px",
    },
    levelDisplay: {
      display: "flex",
      flexDirection: "column",
    },
    heading: {
      color: "#404141",
      paddingTop: 20,
    },
    link: {
      color: "#404141",
      textDecoration: "underline",
      marginTop: 20,
      marginBottom: 20,
      width: 110,
      display: "flex",
      alignSelf: "flex-end",
    },
    error: {
      color: "#f44336",
    },
    disabled: {
      color: "#404141",
      textDecoration: "underline",
      textAlign: "right",
      marginTop: 20,
      marginBottom: 20,
      width: 110,
      display: "flex",
      alignSelf: "flex-end",
    },
    calendar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })
);

export interface ActiveProps {}

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

const ActivePage: React.SFC<ActiveProps> = () => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [assetType, setAssetType] = React.useState("");
  const [assetName, setAssetName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [maximumSubmission, setMaximumSubmission] = React.useState(false);
  const [isPastStart, setIsPastStart] = React.useState(false);
  const [isPastEnd, setIsPastEnd] = React.useState(false);
  const [calendarStartDate, setCalendarStartDate] = React.useState(
    moment().add(1, "minutes").format() as any
  );
  const [calendarEndDate, setCalendarEndDate] = React.useState(
    moment().add(1, "hour").add(2, "minutes").format() as any
  );
  const [dataSets, setDataSets] = React.useState([]);

  const assetNames = { [10]: "Asset1", [20]: "Asset2", [30]: "Asset3" };

  const handleChange = (event) => {
    setAssetName(assetNames[event.target.value]);
    setAssetType(event.target.value);
  };

  const handleStartTimeChange = (newValue: Date | null) => {
    setCalendarStartDate(newValue);
  };

  const handleEndTimeChange = (newValue: Date | null) => {
    setCalendarEndDate(newValue);
  };

  const formik = useFormik({
    initialValues: {
      minLevel: "",
      maxLevel: "",
    },

    validationSchema: Yup.object().shape(
      {
        maxLevel: Yup.number().when("minLevel", (minLevel) => {
          if (minLevel === undefined) {
            return Yup.number();
          } else if (minLevel !== "") {
            setErrorMessage("");
            return Yup.number()
              .required("Empty values are not allowed")
              .test("max", "TO level outside valid range", function (maxLevel) {
                if (maxLevel === undefined) {
                  return true;
                }
                return maxLevel <= 9999 && maxLevel >= 0;
              });
          }
        }),
        minLevel: Yup.number().when("maxLevel", (maxLevel) => {
          if (maxLevel === undefined) {
            return Yup.number()
              .required("Empty values are not allowed")
              .test(
                "max",
                "FROM level outside valid range",
                function (maxLevel) {
                  return maxLevel <= 9999 && maxLevel >= 0;
                }
              );
          } else {
            return Yup.number().required("Empty values are not allowed");
          }
        }),
      },
      [["maxLevel", "minLevel"]]
    ),

    onSubmit: (values, actions) => {
      let start = moment(calendarStartDate).format();
      let end = moment(calendarEndDate).format();
      let current = moment(Date.now()).format();

      if (start > current && end > start) {
        if (assetType !== "") {
          setSelected(false);
          setIsPastStart(false);
          setIsPastEnd(false);
          checkSubmissionDate(values, actions);
        } else {
          setSelected(true);
        }
      } else if (start < current && end < current) {
        setIsPastStart(true);
        setIsPastEnd(true);
      } else if (start > current && end < start) {
        setIsPastEnd(true);
      } else {
        setIsPastStart(true);
      }
    },
  });

  // Logic for maximum submission date
  const checkSubmissionDate = (values, actions) => {
    let startTime = moment(Date.now());
    if (startTime.hour() <= 5) {
      currentDaySubmission(values, actions);
    } else if (startTime.hour() >= 5 && startTime.hour() <= 11) {
      fourDaysSubmission(values, actions);
    } else {
      fiveDaysSubmission(values, actions);
    }
  };

  const currentDaySubmission = (values, actions) => {
    // Added 5 days from the end of the current operational day
    let submissionDate = moment(Date.now())
      .add(5, "days")
      .set("hour", 5)
      .set("minute", 0)
      .format();
    if (moment(calendarEndDate).isSameOrBefore(submissionDate)) {
      setMaximumSubmission(false);
      submitData(values, actions);
    } else {
      setMaximumSubmission(true);
    }
  };

  const fiveDaysSubmission = (values, actions) => {
    // Added 5 days from the end of the current operational day
    let tomorrow = moment().add(1, "days");
    let submissionDate = moment(tomorrow)
      .add(5, "days")
      .set("hour", 5)
      .set("minute", 0)
      .format();
    if (moment(calendarEndDate).isSameOrBefore(submissionDate)) {
      setMaximumSubmission(false);
      submitData(values, actions);
    } else {
      setMaximumSubmission(true);
    }
  };

  const fourDaysSubmission = (values, actions) => {
    // Added 4 days from the end of the current operational day
    let tomorrow = moment().add(1, "days");
    let submissionDate = moment(tomorrow)
      .add(4, "days")
      .set("hour", 5)
      .set("minute", 0)
      .format();
    if (moment(calendarEndDate).isSameOrBefore(submissionDate)) {
      setMaximumSubmission(false);
      submitData(values, actions);
    } else {
      setMaximumSubmission(true);
    }
  };

  const submitData = (values, actions) => {
    if (values.maxLevel === undefined || values.maxLevel === "") {
      setMessage("Empty values are not allowed");
    } else {
      setDataSets([
        ...dataSets,
        {
          asset: assetName,
          startDate: moment(calendarStartDate).format("DD/MM/YYYY HH:mm"),
          endDate: moment(calendarEndDate).format("DD/MM/YYYY HH:mm"),
          minLevel: values.minLevel,
          maxLevel: values.maxLevel,
        },
      ]);
      setOpen(true);
      actions.setSubmitting(false);
      actions.resetForm({
        values: { ...values, minLevel: "", maxLevel: "" },
      });
    }
  };

  return (
    <React.Fragment>
      <Success
        open={open}
        message={"Successful Submission"}
        setOpen={setOpen}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} sm={3}>
            <AssetDisplay
              assetType={assetType}
              handleChange={handleChange}
              selected={selected}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <div className={classes.calendar}>
              <CalendarDisplay
                label={"Start"}
                value={calendarStartDate}
                onChange={handleStartTimeChange}
                isPast={isPastStart}
                message={
                  "Start time must be later than or equal to the Current Time"
                }
                maximumSubmission={false}
              />
              <CalendarDisplay
                label={"End"}
                value={calendarEndDate}
                onChange={handleEndTimeChange}
                isPast={isPastEnd}
                message={"End time must be after the Start time"}
                maximumSubmission={maximumSubmission}
              />
            </div>
          </Grid>
          <Grid item xs={6} sm={4}>
            <div className={classes.levelDisplay}>
              <SubHeadingWrapper>Level</SubHeadingWrapper>
              <Grid container spacing={3}>
                <Grid item sm={6} style={{ paddingTop: 20 }}>
                  <TextInput
                    text="from"
                    label="minLevel"
                    value={formik.values.minLevel}
                    error={
                      formik.touched.minLevel && Boolean(formik.errors.minLevel)
                    }
                    placeholder="+ Value in MW"
                    handleChange={formik.handleChange}
                    errorMessage={
                      Boolean(formik.errors.minLevel)
                        ? formik.errors.minLevel
                        : ""
                    }
                  />
                </Grid>
                <Grid item sm={6} style={{ paddingTop: 20 }}>
                  <TextInput
                    text="to"
                    label="maxLevel"
                    value={formik.values.maxLevel}
                    error={
                      formik.touched.minLevel && Boolean(formik.errors.maxLevel)
                    }
                    placeholder="+ Value in MW"
                    handleChange={formik.handleChange}
                    errorMessage={
                      Boolean(formik.errors.maxLevel)
                        ? formik.errors.maxLevel
                        : errorMessage
                    }
                  />
                </Grid>
              </Grid>
              <Link
                component="button"
                variant="body2"
                className={
                  !(formik.dirty && formik.isValid)
                    ? classes.disabled
                    : classes.link
                }
                type="submit"
              >
                ADD OVERRIDE
              </Link>
            </div>
          </Grid>
        </Grid>
      </form>
      <ActiveTable dataSets={dataSets} />
    </React.Fragment>
  );
};

export default ActivePage;
