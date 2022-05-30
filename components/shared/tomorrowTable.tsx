import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#007070',
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
  
  export default function TomorrowTable({dataSets : rows = []}) {
    return rows.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <StyledTableCell>Asset</StyledTableCell>
            <StyledTableCell align="right">Start</StyledTableCell>
            <StyledTableCell align="right">End</StyledTableCell>
            <StyledTableCell align="right">Offer</StyledTableCell>
            <StyledTableCell align="right">Offer Price</StyledTableCell>
            <StyledTableCell align="right">Offer Undo</StyledTableCell>
            <StyledTableCell align="right">Bid</StyledTableCell>
            <StyledTableCell align="right">Bid Price</StyledTableCell>
            <StyledTableCell align="right">Bid Undo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.asset}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.asset}
                </TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">{row.endDate}</TableCell>
                <TableCell align="right">{row.offer}</TableCell>
                <TableCell align="right">{row.offerPrice}</TableCell>
                <TableCell align="right">{row.offerUndo}</TableCell>
                <TableCell align="right">{row.bid}</TableCell>
                <TableCell align="right">{row.bidPrice}</TableCell>
                <TableCell align="right">{row.bidUndo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : null;
  }