import React from 'react'
import AllTimeProductSalesTable from './AllTimeProductSalesTable'
import MonthlySalesChart from './MonthlySalesChart'

function Dashboard() {
  return (
    <div>
        <MonthlySalesChart></MonthlySalesChart>
        <AllTimeProductSalesTable></AllTimeProductSalesTable>
    </div>
  )
}

export default Dashboard