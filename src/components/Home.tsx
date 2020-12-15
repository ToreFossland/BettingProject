import React, { useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import Navbar from './Navbar';
import Chart from './Chart';
import UnsettledBets from './UnsettledBets';
import BetButton from './BetButton'
import SpanningTable from './BalanceTable';
import LastActions from './LastActions';
import PromotionList from './PromotionList';
import BetList from './BetList';
import WithAuth from "./WithAuth";
import { loadBookies, loadExchanges, loadWallets } from '../redux/actions/bankActions';
import { loadBets } from "../redux/actions/betActions"
import store from '../redux/store';



function Home() {
    useEffect(() => {
        store.dispatch(loadBookies());
        store.dispatch(loadExchanges());
        store.dispatch(loadWallets());
        store.dispatch(loadBets());
    }, []);
    return (
        <Grid container spacing={5} alignItems="flex-end" >
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={7}>
                <div style={{ backgroundColor: "black", width: 1000 }}>
                    <Chart />
                </div>
            </Grid>
            <Grid item xs={5}>
                <Box display="flex" height="90vh" flexDirection="column" justifyContent="space-between" alignItems="center">
                    <BetButton />
                    <SpanningTable />
                    <UnsettledBets />
                    {/* <Fab color="primary" size = "large" aria-label="add">
          <AddIcon />
          </Fab> */}
                </Box>
            </Grid>
            <Grid item xs={6}>
                <LastActions />
            </Grid>
            <Grid item xs={6}>
                <PromotionList />
            </Grid>
            <Grid item xs={12}>
                <BetList />
            </Grid>
        </Grid>
    )
}

export default WithAuth(Home);