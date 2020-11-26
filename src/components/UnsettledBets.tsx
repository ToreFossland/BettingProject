import React, { useState } from "react"
import axios from 'axios';

import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';

interface Bet {
    id: number,
    username: string,
    placeDate: Date,
    betDate: Date,
    event: string,
    backOdds: number,
    layOdds: number,
    backAmount: number,
    layAmount: number,
    bookie: string,
    exchange: string,
    commission: number,
    sport: string,
    freebet: string,
    users: string[]
}

const rows: RowsProp = [
    { id: 1, BetDate: new Date(), event: "", outcome: "", backAmount: 0, information: "" }

];


const columns: ColDef[] = [
    { field: 'betDate', headerName: 'Bet Date', width: 150 },
    { field: 'event', headerName: 'Event', width: 100 },
    { field: 'outcome', headerName: 'Outcome', width: 100 },
    { field: 'backAmount', headerName: 'Back Amount', width: 120 },
    { field: 'information', headerName: 'Information', width: 120 },
];

const UnsettledBets = () => {
    const [bets, setBets] = useState([] as Bet[]);

    const pageSize = 4;

    /* useEffect(() => {
        const fetchData = async () => {
            const response = await
            axios.get('http://localhost:5000/bets/')

            setBets(response.data.map((bet : any) => {
                const temp : Bet = {
                    id: bet._id,
                    username : bet.username,
                    placeDate: bet.placeDate,
                    betDate: bet.betDate,
                    event: bet.event,
                    backOdds: bet.backOdds,
                    layOdds: bet.layOdds,
                    backAmount: bet.backAmount,
                    layAmount: bet.layAmount,
                    bookie: bet.bookie,
                    exchange: bet.exchange,
                    commission: bet.commission,
                    sport: bet.sport,
                    freebet: bet.freebet,
                    users: bet.users
                }  
                return(temp);

            }
        ))};
        fetchData();
    }, []) */

    return (
        <div style={{ height: 320, width: 600 }}>
            <DataGrid rows={bets} columns={columns} pageSize={pageSize} />
        </div>
    )
}

export default UnsettledBets;