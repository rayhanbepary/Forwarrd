import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import Axios from 'axios';

class RecentGrid extends Component {


    state = {
        recentWithdraws: [],
        recentDeposits: [],
        recentUsers: []
    }

    componentDidMount() {
        this.recentWithdraw();
        this.recentDeposit();
        this.recentUser();
    }

    recentWithdraw () {
        Axios.get('https://forwarrd.herokuapp.com/api/withdraws/admin/allWithdraw')
        .then(response => {
            let data = response.data;
            let slice = data.slice(0,5);

            this.setState({
                recentWithdraws: slice
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

    recentDeposit () {
        Axios.get('https://forwarrd.herokuapp.com/api/deposits/admin/allDeposits')
        .then(response => {
            let data = response.data;
            let slice = data.slice(0,5);

            this.setState({
                recentDeposits: slice
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

    recentUser () {
        Axios.get('https://forwarrd.herokuapp.com/api/users/all/users')
        .then(response => {
            let data = response.data;
            let slice = data.slice(0,5);

            this.setState({
                recentUsers: slice
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

    render() {

        let { recentWithdraws, recentDeposits, recentUsers } = this.state;

        return (
            <div className="recent-grid">
                <div className="recent-withdraw">
                    <div className="withdraw-card">
                        <div className="recent-card-header">
                            <h4>Recent Withdraw</h4>
                            <Link to="/withdraw-all">
                                <button>See all <BsArrowRightShort/></button>
                            </Link>
                        </div>
                        <div className="recent-card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td className="text-center">Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            recentWithdraws.map(result => 
                                            <tr key={result._id}>
                                                <td>{result.name}</td>
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
                <div className="recent-deposit">
                    <div className="deposit-card">
                        <div className="recent-card-header">
                            <h4>Recent Deposit</h4>
                            <Link to="/deposit-all">
                                <button>See all <BsArrowRightShort/></button>
                            </Link>
                        </div>
                        <div className="recent-card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Organization</td>
                                            <td className="text-center">Quantity</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            recentDeposits.map(result => 
                                                <tr key={result._id}>
                                                    <td>{result.orgName}</td>
                                                    <td className="text-center">{result.quantity} kg</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recent-user">
                    <div className="user-card">
                        <div className="recent-card-header">
                            <h4>Recent User</h4>
                            <Link to="/users">
                                <button>See all <BsArrowRightShort/></button>
                            </Link>
                        </div>
                        <div className="recent-card-body">
                            <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td className="text-center">Organization</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            recentUsers.map(result => 
                                                <tr key={result._id}>
                                                    <td>{result.name}</td>
                                                    <td className="text-center">{result.orgName}</td>
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


export default RecentGrid;