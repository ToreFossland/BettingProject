import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class CreateBet extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePlaceDate = this.onChangePlaceDate.bind(this);
        this.onChangeBetDate = this.onChangeBetDate.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onChangeBackOdds = this.onChangeBackOdds.bind(this);
        this.onChangeLayOdds = this.onChangeLayOdds.bind(this);
        this.onChangeBackAmount = this.onChangeBackAmount.bind(this);
        this.onChangeLayAmount = this.onChangeLayAmount.bind(this);
        this.onChangeBookie = this.onChangeBookie.bind(this);
        this.onChangeExchange= this.onChangeExchange.bind(this);
        this.onChangeCommision = this.onChangeCommision.bind(this);
        this.onChangeSport = this.onChangeSport.bind(this);
        this.onChangeFreeBet = this.onChangeFreeBet.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username: "",
            placeDate: new Date(),
            betDate: new Date(),
            event: "",
            backOdds: 0,
            layOdds: 0,
            backAmount: 0,
            layAmount: 0,
            bookie: "",
            exchange: "",
            commission: 0,
            sport: "",
            freebet: "No",
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/5f908e633f6c3f33849fc5dc')
            .then(res => {
                if (res.data.gnomes.length > 0){
                    this.setState({
                        users: res.data.gnomes.map(user => user.username),
                        username: res.data.gnomes[0].username
                    })
                }
            })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePlaceDate(date){
        this.setState({
            placeDate: date
        });
    }
    onChangeBetDate(date){
        this.setState({
            betDate: date
        });
    }
    onChangeEvent(e){
        this.setState({
            event: e.target.value
        });
    }
    onChangeBackOdds(e){
        this.setState({
            backOdds: e.target.value
        });
    }
    onChangeLayOdds(e){
        this.setState({
            layOdds: e.target.value
        });
    }
    onChangeBackAmount(e){
        this.setState({
            backAmount: e.target.value
        });
    }

    onChangeLayAmount(e){
        this.setState({
            layAmount: e.target.value
        });
    }
    onChangeBookie(e){
        this.setState({
            bookie: e.target.value
        });
    }
    onChangeExchange(e){
        this.setState({
            exchange: e.target.value
        });
    }
    onChangeCommision(e){
        this.setState({
            commission: e.target.value
        });
    }
    onChangeSport(e){
        this.setState({
            sport: e.target.value
        });
    }
    onChangeFreeBet(e){
        this.setState({
            freebet: e.target.value
        });
    } 

    onSubmit(e) {
        e.preventDefault();
        var free_bet = "No"
        if (document.getElementById("is_freebet").checked){
            free_bet="Yes"
        }
        const bet = {
            username: this.state.username,
            placeDate: this.state.placeDate,
            betDate: this.state.betDate,
            event: this.state.event,
            backOdds: this.state.backOdds,
            layOdds: this.state.layOdds,
            backAmount: this.state.backAmount,
            layAmount: this.state.layAmount,
            bookie: this.state.bookie,
            exchange: this.state.exchange,
            commission: this.state.commission,
            sport: this.state.sport,
            freebet: free_bet
        }
        console.log(bet)

        axios.post('http://localhost:5000/bets/add', bet)
        .then(res => console.log(res.data)); 

        window.location = "/"
    }

    render() {
        return(
            <div>
                <h3>Create new bet</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="from-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>
                                })
                            }
                            </select>

                    </div>
                    <div className="from-group">
                        <label>Place date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.placeDate}
                                onChange={this.onChangePlaceDate}
                                />
                        </div>
                    </div>
                    <div className="from-group">
                        <label>Event date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.betDate}
                                onChange={this.onChangeBetDate}
                                />
                        </div>
                    </div>
                    <div className="from-group">
                        <label>Event: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.event}
                            onChange={this.onChangeEvent}
                        />
                    </div>
                    <div className="from-group">
                        <label>Back odds: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.backOdds}
                            onChange={this.onChangeBackOdds}
                        />
                    </div>
                    <div className="from-group">
                        <label>Lay odds: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.layOdds}
                            onChange={this.onChangeLayOdds}
                        />
                    </div>
                    <div className="from-group">
                        <label>Back amount: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.backAmount}
                            onChange={this.onChangeBackAmount}
                        />
                    </div>
                    <div className="from-group">
                        <label>Lay amount: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.layAmount}
                            onChange={this.onChangeLayAmount}
                        />
                    </div>
                    <div className="from-group">
                        <label>Bookie: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.bookie}
                            onChange={this.onChangeBookie}
                        />
                    </div>
                    <div className="from-group">
                        <label>Exchange: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.exchange}
                            onChange={this.onChangeExchange}
                        />
                    </div>
                    <div className="from-group">
                        <label>Commission: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.commission}
                            onChange={this.onChangeCommision}
                        />
                    </div>
                    <div className="from-group">
                        <label>Sport: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.sport}
                            onChange={this.onChangeSport}
                        />
                    </div>
                    <div className="from-group">
                        <label>Freebet: </label>
                        <input
                            id="is_freebet"
                            type="checkbox"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Bet" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}