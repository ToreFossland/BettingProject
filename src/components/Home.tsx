import React, { useEffect, useState } from 'react';
// import Navbar from "./components/navbar.component"
// import BetList from "./components/bet-list.component"
// import CreateBet from "./components/create-bet.component"
// import CreateUser from "./components/create-user.component"
import { flexbox } from '@material-ui/system';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, withStyles, Fab } from '@material-ui/core';
import { grey, blue, amber } from '@material-ui/core/colors';
import Background from './soccer.jpg';
import Navbar from './Navbar';
import Chart from './Chart';
import UnsettledBets from './UnsettledBets';
import BetButton from './BetButton'
import SpanningTable from './BalanceTable';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LastActions from './LastActions';
import PromotionList from './PromotionList';
import BetList2 from './BetList';
import WithAuth from "./WithAuth";


function Home() {
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
                <BetList2 />
            </Grid>
        </Grid>
    )
}

export default WithAuth(Home);