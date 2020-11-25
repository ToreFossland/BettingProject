import React, { useEffect, useState } from "react"
import axios from 'axios';

import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';


const rows: RowsProp = [
    { id: 1, bookie: "Unibet", promotion: "Freebet", terms: "Place bet 200kr on CL get 200kr freebet."},
    { id: 2, bookie: "NorgesSpill", promotion: "Bonus", terms: "Deposit 1000kr get 500kr Bonus 8x rollover"},


  ];
  
  
const columns: ColDef[] = [
    { field: 'bookie', headerName: 'Bookie', width: 100 },
    { field: 'promotion', headerName: 'Promotion', width: 100 },
    { field: 'terms', headerName: 'Terms', width: 350 },
];

const PromotionList = () => {

    const pageSize = 4;


    return(
        <div style={{ height: 320, width: 600 }}>
        <DataGrid rows={rows} columns={columns} pageSize = {pageSize} />
      </div>
    )
}

export default PromotionList;