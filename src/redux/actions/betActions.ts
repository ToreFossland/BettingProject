import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  BETS_LOADED,
  BETS_LOADING,
  AUTH_ERROR,
  TODAYS_BETS_LOADED,
  FIXTURE_ERROR,
  TODAYS_BETS_SETTLED,
  CHECKING_TODAYS_BETS,
  SETTELING_OLD_BETS,
  SETTELD_OLD_BETS
} from './types';
import { tokenConfig } from "./authActions"
import moment from 'moment'
import store from '../store';
import { updateBookieBalance, updateExchangeBalance } from './bankActions';

require('dotenv').config();

// Check token & load user
export const loadBets = () => (dispatch: Function, getState: Function) => {
  // Bet loading
  dispatch({ type: BETS_LOADING });

  axios
    .get('http://localhost:5000/bets/', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: BETS_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};


export const loadTodaysBets = () => (dispatch: Function, getState: Function) => {
  // Bet loading
  dispatch({ type: BETS_LOADING });

  axios
    .get('http://localhost:5000/bets/todays-bets/', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: TODAYS_BETS_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const settleOldBets = () => async (dispatch: Function, getState: Function) => {
  let unsettled_bets = await axios.get('http://localhost:5000/bets/unsettled-bets', tokenConfig(getState))
  if (!unsettled_bets.data.length || getState().bet.settling_bets || getState().bet.settled_old_bets) {
    return
  }
  dispatch({ type: SETTELING_OLD_BETS })
  for (var i = 0; i < unsettled_bets.data.length; i++) {
    if (!unsettled_bets.data[i].settled) {
      let bet = await settleBet(dispatch, getState, unsettled_bets.data[i])
      updateBookieBalance(dispatch, getState, bet)
      updateExchangeBalance(dispatch, getState, bet)
    }
  }
  dispatch({ type: SETTELD_OLD_BETS })
}


export const checkTodaysBets = () => async (dispatch: Function, getState: Function) => {
  let todays_bets = getState().bet.todays_bets
  if (!todays_bets.length || getState().bet.settling_bets) {
    return
  }
  dispatch({ type: CHECKING_TODAYS_BETS })
  for (var i = 0; i < todays_bets.length; i++) {
    let bet = todays_bets[i]
    const eventTime = bet.betDate;
    const endTime = moment(eventTime).add(115, 'm').toDate().toISOString()
    const now = new Date().toISOString()
    if (now > endTime && !bet.settled) {
      bet = await settleBet(dispatch, getState, bet)
      updateBookieBalance(dispatch, getState, bet)
      updateExchangeBalance(dispatch, getState, bet)
    }
    todays_bets[i] = bet
  }
  dispatch({ type: TODAYS_BETS_SETTLED, payload: todays_bets })
}

async function settleBet(dispatch: Function, getState: Function, bet: any) {
  const token = getState().auth.token
  const teamId = await axios.get("http://localhost:5000/teams/team-id", { params: { teamName: bet.homeTeam }, headers: { "x-auth-token": token } })
  const lastFixture = await getLastFixture(teamId.data, bet.awayTeam)
  if (lastFixture) {
    if (lastFixture.score.fulltime) {
      const didWin = checkIfWonBet(lastFixture, bet)
      await axios.post("http://localhost:5000/bets/settle-result", { params: { id: bet._id, didWin: didWin } })
        .then(res => console.log(res.data))
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({
            type: FIXTURE_ERROR
          });
        });
      //oppdatere balanse hos bookies og exchanges
      bet.settled = true;
      bet.didWin = didWin;
    }
    else {
      dispatch(returnErrors({ msg: 'Fixture not finished yet' }, 400))
      dispatch({
        type: FIXTURE_ERROR
      })
    }
  }
  else {
    dispatch(returnErrors({ msg: 'The fixture is not correct' }, 400))
    dispatch({
      type: FIXTURE_ERROR
    })
  }
  return bet
}

async function getLastFixture(teamId: any, awayTeam: any) {
  const rapidapi_key = process.env.REACT_APP_RAPIDAPI_KEY
  const rapidapi_host = process.env.REACT_APP_RAPIDAPI_HOST
  const lastFixtureObject = await axios.get('https://api-football-v1.p.rapidapi.com/v2/fixtures/team/' + teamId + '/last/1',
    { params: { timezone: 'Europe/London' }, headers: { 'x-rapidapi-key': rapidapi_key, 'x-rapidapi-host': rapidapi_host } })
  const lastFixture = lastFixtureObject.data.api.fixtures[0]
  if (lastFixture.awayTeam.team_name === awayTeam) {
    return lastFixture
  }
  return
}

function checkIfWonBet(lastFixture: any, bet: any) {
  switch (bet.eventType) {

    case "HDA":
      if (bet.outcome === bet.homeTeam && lastFixture.goalsHomeTeam > lastFixture.goalsAwayTeam) {
        return true
      }
      if (bet.outcome === bet.awayTeam && lastFixture.goalsHomeTeam < lastFixture.goalsAwayTeam) {
        return true
      }
      if (bet.outcome === "Draw" && lastFixture.goalsHomeTeam === lastFixture.goalsAwayTeam) {
        return true
      }
      return false

    case "result":
      if (bet.outcome === lastFixture.score.fulltime) {
        return true
      }
      return false

    case "BTTS":
      if (lastFixture.goalsHomeTeam > 0 && lastFixture.goalsAwayTeam > 0 && bet.outcome === "Yes") {
        return true
      }
      return false

    case "O/U": //over under 
      if (bet.outcome === "Yes" && lastFixture.goalsHomeTeam + lastFixture.goalsAwayTeam > bet.overUnder)
        return true
      if (bet.outcome === "No" && lastFixture.goalsHomeTeam + lastFixture.goalsAwayTeam < bet.overUnder)
        return true
      return false

    default:
      return "Some error has occured"
  }
}