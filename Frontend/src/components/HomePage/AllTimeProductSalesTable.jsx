import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../cookie-functions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AllTimeProductSalesTable() {

  const [saleHistory, setSaleHistory] = useState([]);

  useEffect(() => {
    const vendorId = getCookie("vendorId")
    let api = `http://localhost:8080/dashboard/vendor/${vendorId}/sale`;

    axios
      .get(api)
      .then((response) => {
        console.log(response.data);
        if (response.data != null) {
          setSaleHistory(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching monthly sales data:", error);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Total Sold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {saleHistory.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell>{row.totalSold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
}

export default AllTimeProductSalesTable