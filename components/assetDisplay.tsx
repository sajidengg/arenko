import * as React from "react";
import { makeStyles, createStyles, withStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { FormHelperText, styled } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: "#f44336",
    },
  })
);

export interface AssetDisplayProps {
    assetType: string;
    handleChange: (event: any) => void;
    selected: boolean

}

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

const AssetDisplay: React.SFC<AssetDisplayProps> = ({assetType, handleChange, selected}: AssetDisplayProps) => {
  const classes = useStyles();

  return (
    <>
      <SubHeadingWrapper>
        3 available assets in your portfolio
      </SubHeadingWrapper>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={assetType}
            onChange={handleChange}
          >
            <MenuItem value={10}>Asset1</MenuItem>
            <MenuItem value={20}>Asset2</MenuItem>
            <MenuItem value={30}>Asset3</MenuItem>
          </Select>
        </FormControl>
        <FormHelperText>
          {selected ? (
            <span className={classes.error}>{"Please select the asset"}</span>
          ) : null}
        </FormHelperText>
      </Box>
    </>
  );
};

export default AssetDisplay;
