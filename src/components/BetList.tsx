import React, { useEffect } from "react"
import { connect, useSelector } from 'react-redux';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { IBetReduxProps, IExistingBet } from "../types/interfaces"
import { RootState } from "../redux/reducers"
import { checkTodaysBets } from "../redux/actions/betActions"
import store from '../redux/store';

const rows: RowsProp = [
    {
        id: "", placeDate: new Date(), BetDate: new Date(), event: "", backOdds: 0, layOdds: 0, backAmount: 0, layAmount: 0, bookie: "",
        exchange: "", commision: 0, sport: "", freebet: "", outcome: ""
    },
];

const columns: ColDef[] = [
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
    { field: 'outcome', headerName: 'Outcome', width: 100 },
];


const BetList = () => {
    const { bets } = useSelector((state: RootState) => state.bet)
    const { activeGnome } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        store.dispatch(checkTodaysBets());
    }, [bets]);

    return (
        <div style={{ height: 1000, width: '100%' }}>
            {bets ?
                <DataGrid rows={bets.map((bet: IExistingBet, index: number) => ({
                    id: index, placeDate: bet.placeDate, betDate: bet.betDate, event: bet.event, backOdds: bet.backOdds, layOdds: bet.layOdds, backAmount: bet.backAmount, layAmount: bet.layAmount, bookie: bet.bookie,
                    exchange: bet.exchange, commission: bet.commission, sport: bet.sport, freebet: bet.freebet, outcome: bet.outcome
                }
                ))} columns={columns} />
                : null}
        </div>
    )
};

const mapStateToProps = (state: IBetReduxProps) => ({
    bet: state.bet,
    isAuthenticated: state.auth.isAuthenticated

});

export default connect(mapStateToProps)(BetList);
