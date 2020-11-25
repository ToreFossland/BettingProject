import React, { useEffect, useState } from "react"
import axios from 'axios';
import {RootState} from '../redux/reducers/index';

import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';

import { useSelector } from 'react-redux'

import {IBet} from '../types/interfaces'

const rows: RowsProp = [
    {
        id: 1, username: 'Hello', placeDate: new Date(), BetDate: new Date(), event: "", backOdds: 0, layOdds: 0, backAmount: 0, layAmount: 0, bookie: "",
        exchange: "", commision: 0, sport: "", freebet: "", users: []
    },

];


const columns: ColDef[] = [
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'placeDate', headerName: 'Place Date', width: 150 },
    { field: 'betDate', headerName: 'Bet Date', width: 150 },
    { field: 'event', headerName: 'Event', width: 100 },
    { field: 'backOdds', headerName: 'Back Odds', width: 120 },
    { field: 'layOdds', headerName: 'Lay Odds', width: 100 },
    { field: 'backAmount', headerName: 'Back Amount', width: 120 },
    { field: 'layAmount', headerName: 'Lay Amount', width: 120 },
    { field: 'bookie', headerName: 'Bookie', width: 100 },
    { field: 'exchange', headerName: 'Exchange', width: 100 },
    { field: 'comission', headerName: 'Comission', width: 100 },
    { field: 'sport', headerName: 'Sport', width: 100 },
    { field: 'freebet', headerName: 'Freebet?', width: 100 },
    { field: 'users', headerName: 'Users', width: 100 },
];

const BetList2 = () => {
    const [bets, setBets] = useState([] as IBet[]);

    // let betss = useSelector((state : RootState) => state.bet.bets);

    // console.log(betss);

    const pageSize = 25;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await
    //             axios.get('http://localhost:5000/bets/')

    //         setBets(response.data.map((bet: any) => {
    //             const temp: Bet = {
    //                 id: bet._id,
    //                 username: bet.userId,
    //                 placeDate: bet.placeDate,
    //                 betDate: bet.betDate,
    //                 event: bet.event,
    //                 backOdds: bet.backOdds,
    //                 layOdds: bet.layOdds,
    //                 backAmount: bet.backAmount,
    //                 layAmount: bet.layAmount,
    //                 bookie: bet.bookie,
    //                 exchange: bet.exchange,
    //                 commission: bet.commission,
    //                 sport: bet.sport,
    //                 freebet: bet.freebet,
    //                 users: bet.users
    //             }
    //             return (temp);

    //         }
    //         ))
    //     };
    //     fetchData();
    // }, [])

    return (
        <div style={{ height: 1000, width: '100%' }}>
            <DataGrid rows={bets} columns={columns} />
        </div>
    )
}

export default BetList2;