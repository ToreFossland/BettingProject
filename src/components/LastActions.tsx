import React, { useEffect, useState } from "react"
import axios from 'axios';

import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';


const rows: RowsProp = [
    { id: 1, lastAction: "Placed bet sucessfully!", event: "Manchester United-Liverpool, Draw"},
    { id: 2, lastAction: "Placed bet sucessfully!", event: "Rosenborg-Barcelona, Rosenborg"}

  ];
  
  
const columns: ColDef[] = [
    { field: 'lastAction', headerName: 'Last Actions', width: 200 },
    { field: 'event', headerName: 'Event', width: 375 },
];

const LastActions = () => {

    const pageSize = 4;


    return(
        <div style={{ height: 320, width: 600 }}>
        <DataGrid rows={rows} columns={columns} pageSize = {pageSize} />
      </div>
    )
}

export default LastActions;