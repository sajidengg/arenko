import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Link, styled } from "@mui/material";
import AssetDisplay from "./assetDisplay";
import BodTextInput from "./shared/bodTextInput";
import BodPriceInput from "./shared/priceInput";
import TextInput from "./shared/customTextInput";
import BidTextInput from "./shared/bidTextInput";
import TomorrowTable from "./shared/tomorrowTable";
import Success from "./success";

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
    offerSection: {
      display: "flex",
      flexDirection: "row",
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

export interface TomorrowPageProps {}

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

const TomorrowPage: React.SFC<TomorrowPageProps> = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [assetType, setAssetType] = React.useState("");
  const [assetName, setAssetName] = React.useState("");
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
      offer: "",
      offer_price: "",
      offer_undo: "",
      bid: "",
      bid_price: "",
      bid_undo: "",
    },
    validationSchema: Yup.object({
      bid: Yup.number()
        .integer()
        .test("max", "Enter value between -9999 and 0", function (bid) {
          if (bid !== undefined) {
            return bid < 0 && bid >= -9999;
          } else {
            return true;
          }
        }),
      offer: Yup.number().when("bid", (bid) => {
        if (bid === undefined) {
          return Yup.number().required("OFFER and BID empty");
        } else {
          return Yup.number();
        }
      }),
      offer_price: Yup.number().when("offer", (offer) => {
        if (offer === undefined) {
          return Yup.number();
        } else if (offer !== "") {
          return Yup.number()
            .required("field required")
            .test(
              "max",
              "offer prices must be greater than bid undo",
              function (offer_price) {
                const { bid_undo } = this.parent;
                if (bid_undo === undefined) {
                  return true;
                }
                return offer_price >= bid_undo;
              }
            )
            .test(
              "max",
              "'offer price' outside valid range",
              function (maxLevel) {
                return maxLevel >= -99999 && maxLevel <= 99999;
              }
            )
            .test(
              "maxDigitsAfterDecimal",
              "bid and offer prices must only have 2 decimal places",
              (number) => {
                if (number > 0) {
                  return /^\d+(\.\d{1,2})?$/.test(String(number));
                } else {
                  return true;
                }
              }
            )
            .test(
              "max",
              "Offer price must be greater than Undo",
              function (offer_price) {
                const { offer_undo } = this.parent;
                if (offer_undo === undefined) {
                  return true;
                }
                return offer_price >= offer_undo;
              }
            );
        }
      }),
      offer_undo: Yup.number().when("offer", (offer) => {
        if (offer === undefined) {
          return Yup.number();
        } else if (offer !== "") {
          return Yup.number()
            .required("field required")
            .test(
              "max",
              "Offer undo must be greater than bid price",
              function (offer_undo) {
                const { bid_price } = this.parent;
                if (bid_price === undefined) {
                  return true;
                }
                return offer_undo >= bid_price;
              }
            );
        }
      }),
      bid_price: Yup.number().when("bid", (bid) => {
        if (bid === undefined) {
          return Yup.number();
        } else if (bid !== "") {
          return Yup.number()
            .required("field required")
            .test(
              "maxDigitsAfterDecimal",
              "bid and offer prices must only have 2 decimal places",
              (number) => {
                if (number > 0) {
                  return /^\d+(\.\d{1,2})?$/.test(String(number));
                } else {
                  return true;
                }
              }
            )
            .test(
              "max",
              "'bid price' outside valid range",
              function (maxLevel) {
                return maxLevel >= -99999 && maxLevel <= 99999;
              }
            )
            .test(
              "max",
              "Bid price must be less than Undo",
              function (bid_price) {
                const { bid_undo } = this.parent;
                if (bid_undo === undefined) {
                  return true;
                }
                return bid_price <= bid_undo;
              }
            );
        }
      }),
      bid_undo: Yup.number().when("bid", (bid) => {
        if (bid === undefined) {
          return Yup.number();
        } else if (bid !== "") {
          return Yup.number().required("field required");
        }
      }),
    }),

    onSubmit: (values, actions) => {
      let start = moment(calendarStartDate).format();
      let end = moment(calendarEndDate).format();
      let current = moment(Date.now()).format();

      if (start > current && end > start) {
        if (assetType !== "") {
          setSelected(false);
          setIsPastStart(false);
          setIsPastEnd(false);
          submitData(values, actions);
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

  const submitData = (values, actions) => {
    setDataSets([
      ...dataSets,
      {
        asset: assetName,
        startDate: moment(calendarStartDate).format("DD/MM/YYYY HH:mm"),
        endDate: moment(calendarEndDate).format("DD/MM/YYYY HH:mm"),
        offer: values.offer,
        offerPrice: values.offer_price,
        offerUndo: values.offer_undo,
        bid: values.bid,
        bidPrice: values.bid_price,
        bidUndo: values.bid_undo,
      },
    ]);
    setOpen(true);
    actions.setSubmitting(false);
    actions.resetForm({
      values: { ...values, offer: "", offer_price: "", offer_undo: "", bid: "", bid_undo: "", bid_price: "" },
    });
  };

  return (
    <div>
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
          <Grid item xs={12} sm={9}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={12}>
                <div className={classes.offerSection}>
                  <BodTextInput
                    text="OFFER"
                    label="offer"
                    value={formik.values.offer}
                    helperText={formik.touched.offer && formik.errors.offer}
                    error={formik.touched.offer && Boolean(formik.errors.offer)}
                    placeholder="+ Value in MW"
                    handleChange={formik.handleChange}
                    InputProps={{ inputProps: { min: 1, max: 9999 } }}
                  />
                  <BodPriceInput
                    text="PRICE"
                    label="offer_price"
                    value={formik.values.offer_price}
                    helperText={
                      formik.touched.offer_price && formik.errors.offer_price
                    }
                    error={
                      formik.touched.offer_price &&
                      Boolean(formik.errors.offer_price)
                    }
                    placeholder="Value in £/MWh"
                    handleChange={formik.handleChange}
                  />
                  <TextInput
                    text="UNDO"
                    label="offer_undo"
                    value={formik.values.offer_undo}
                    helperText={
                      formik.touched.offer_undo && formik.errors.offer_undo
                    }
                    error={
                      formik.touched.offer_undo &&
                      Boolean(formik.errors.offer_undo)
                    }
                    placeholder="Value in £/MWh"
                    handleChange={formik.handleChange}
                    errorMessage={""}
                  />
                </div>
              </Grid>
              <Grid item xs={6} sm={12}>
                <div className={classes.offerSection}>
                  <BidTextInput
                    text="BID"
                    label="bid"
                    value={formik.values.bid}
                    helperText={formik.touched.bid && formik.errors.bid}
                    error={formik.touched.bid && Boolean(formik.errors.bid)}
                    handleChange={formik.handleChange}
                    errorMessage={""}
                  />
                  <BodPriceInput
                    text="PRICE"
                    label="bid_price"
                    value={formik.values.bid_price}
                    helperText={
                      formik.touched.bid_price && formik.errors.bid_price
                    }
                    error={
                      formik.touched.bid_price &&
                      Boolean(formik.errors.bid_price)
                    }
                    placeholder="Value in £/MWh"
                    handleChange={formik.handleChange}
                  />
                  <TextInput
                    text="UNDO"
                    label="bid_undo"
                    value={formik.values.bid_undo}
                    helperText={
                      formik.touched.bid_undo && formik.errors.bid_undo
                    }
                    error={
                      formik.touched.bid_undo && Boolean(formik.errors.bid_undo)
                    }
                    placeholder="Value in £/MWh"
                    handleChange={formik.handleChange}
                    errorMessage={""}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
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
          </Grid>
        </Grid>
      </form>
      <TomorrowTable dataSets={dataSets} />
    </div>
  );
};

export default TomorrowPage;
