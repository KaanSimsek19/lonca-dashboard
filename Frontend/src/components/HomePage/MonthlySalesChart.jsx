import React, { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import axios from "axios";
import { getCookie } from "../../cookie-functions";

function MonthlySalesChart() {
  const [saleHistory, setSaleHistory] = useState([{"totalSold" : 5, "_id" : {"year": 2021, "month": 12}}]);

  useEffect(() => {
    const vendorId = getCookie("vendorId");
    let api = `http://localhost:8080/dashboard/vendor/${vendorId}/monthly-sales`;

    axios
      .get(api)
      .then((response) => {
        console.log(response.data);
        if (response.data?.monthlySales) {
          setSaleHistory(response.data.monthlySales);
        }
      })
      .catch((error) => {
        console.error("Error fetching monthly sales data:", error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: saleHistory.map((entry) => `${entry._id.year}-${entry._id.month}`),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: saleHistory.map((entry) => entry.totalSold)
          },
        ]}
        width={1000}
        height={600}
      />
    </div>
  );
}

export default MonthlySalesChart;

