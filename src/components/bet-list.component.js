import React, {Component} from "react"
import axios from 'axios';
//import { Link } from 'react-router-dom';

const Bet = props => (
    <tr>
      <td>{props.bet.username}</td>
      <td>{props.bet.placeDate.substring(0,10)}</td>
      <td>{props.bet.betDate.substring(0,10)}</td>
      <td>{props.bet.event}</td>
      <td>{props.bet.layOdds}</td>
      <td>{props.bet.backOdds}</td>
      <td>{props.bet.layAmount}</td>
      <td>{props.bet.backAmount}</td>
      <td>{props.bet.bookie}</td>
      <td>{props.bet.exchange}</td>
      <td>{props.bet.commission}</td>
      <td>{props.bet.sport}</td>
      <td>{props.bet.freebet}</td>
      <td>
        {/* <Link to={"/edit/"+props.bet._id}>edit</Link> | */} <a href="#" onClick={() => { props.deleteBet(props.bet._id) }}>delete</a>
      </td>
    </tr>
  )

export default class BetList extends Component{
    constructor(props) {
        super(props);
    
        this.deleteBet = this.deleteBet.bind(this)
    
        this.state = {bets: []};
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/bets/')
          .then(response => {
              console.log(response.data)
            this.setState({ bets: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      deleteBet(id) {
        axios.delete('http://localhost:5000/bets/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          bets: this.state.bets.filter(el => el._id !== id)
        })
      }
    
      betList() {
        return this.state.bets.map(currentbet => {
          return <Bet bet={currentbet} deleteBet={this.deleteBet} key={currentbet._id}/>;
        })
      }

    render() {
        return(
            <div>
            <h3>Logged bets</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Place date</th>
                  <th>Event date</th>
                  <th>Event</th>
                  <th>Lay odds</th>
                  <th>Back odds</th>
                  <th>Lay amount</th>
                  <th>Back amount</th>
                  <th>Bookie</th>
                  <th>Exchange</th>
                  <th>Commission</th>
                  <th>Sport</th>
                  <th>Freebet</th>
                </tr>
              </thead>
              <tbody>
                { this.betList() }
              </tbody>
            </table>
          </div>
        )
    }
}