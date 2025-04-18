"use client";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ListTable({ results }) {
  if (!results || results.length === 0) {
    return <p>No results found. Try adjusting your search criteria.</p>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Institute</StyledTableCell>
            <StyledTableCell align="right">Branch</StyledTableCell>
            <StyledTableCell align="right">Quota</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Opening Rank</StyledTableCell>
            <StyledTableCell align="right">Closing Rank</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((college, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {college.institute}
              </StyledTableCell>
              <StyledTableCell align="right">{college.branch}</StyledTableCell>
              <StyledTableCell align="right">{college.quota}</StyledTableCell>
              <StyledTableCell align="right">{college.category}</StyledTableCell>
              <StyledTableCell align="right">{college.opening_rank}</StyledTableCell>
              <StyledTableCell align="right">{college.closing_rank}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}