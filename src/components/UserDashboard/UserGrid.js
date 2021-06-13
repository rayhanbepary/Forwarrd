import React, { Component } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class UserGrid extends Component {


    state = {
        userDeposits: [],
        userWithdraws: []
    }

    componentDidMount() {
        this.userWithdraw();
        this.userDeposit();
    }

    userDeposit () {
        Axios.get('https://forwarrd.herokuapp.com/api/deposits/diff/user/allDeposits')
        .then(response => {
            let data = response.data;
            let slice = data.slice(0,5);

            this.setState({
                userDeposits: slice
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

    userWithdraw () {
        Axios.get('https://forwarrd.herokuapp.com/api/withdraws/diff/user/allWithdraw')
        .then(response => {
            let data = response.data;
            let slice = data.slice(0,5);

            this.setState({
                userWithdraws: slice
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

    formatDate(nowDate) {
        return nowDate.getDate() +"-"+ (nowDate.getMonth() + 1) + '-'+ nowDate.getFullYear();
    }

    render() {

        let { userDeposits, userWithdraws } = this.state;

        return (
            <div className="user-grid">
                <div className="user-deposit">
                    <div className="user-grid-card">
                        <div className="recent-card-header">
                            <h4>Deposits</h4>
                            <Link to="/deposit-all-user">
                                <button>See all <BsArrowRightShort/></button>
                            </Link>
                        </div>
                        <div className="recent-card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Quantity</td>
                                            <td className="text-center">Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userDeposits.map(result => 
                                            <tr key={result._id}>
                                                <td>{result.quantity} kg<br/>
                                                    <small style={{color: '#8c9090'}}>{this.formatDate(new Date(result.createdAt))}</small>
                                                </td>
                                                <td className="text-center">{result.amount} tk</td>
                                            </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-withdraw">
                    <div className="user-grid-card">
                        <div className="recent-card-header">
                            <h4>Withdraws</h4>
                            <Link to="/withdraw-all-user">
                                <button>See all <BsArrowRightShort/></button>
                            </Link>
                        </div>
                        <div className="recent-card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Amount</td>
                                            <td className="text-center">Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        userWithdraws.map(result =>
                                        <tr key={result._id}>
                                            <td>{result.amount} tk<br/>
                                                <small style={{color: '#8c9090'}}>{this.formatDate(new Date(result.createdAt))}</small>
                                            </td>
                                            <td className="text-center">{result.status}</td>
                                        </tr>    
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserGrid;