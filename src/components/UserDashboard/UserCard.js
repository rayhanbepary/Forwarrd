import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllUsers } from '../../store/actions/authActions';
import Axios from 'axios';

class UserCard extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        this.getAllUsers();
    }


    getAllUsers () {
        Axios.get('https://forwarrd.herokuapp.com/api/users/all/users')
        .then(response => {
            let allUser = response.data;
            const { user } = this.props.auth;
            if (allUser) {
                let mainUser = allUser.find(users => users._id === user._id);
                if(!mainUser){
                    return null;
                }
                this.setState({ user: mainUser});
            }
        })
        .catch(error => {
            console.log(error);
        })
    };


    render() {

        let {user} = this.state;
        
        return (
            <div className="users-card-wrapper">
                <div className="users-card-balance">
                    <span>Total Balance</span>
                    <h2>{user.balance}</h2>
                </div>
                <div className="users-card">
                    <div className="card-single">
                        <div>
                            <span>Deposit</span>
                            <h4>{user.deposit}</h4>
                        </div>
                    </div>
                    <div className="card-single">
                        <div>
                            <span>Withdraw</span>
                            <h4>{user.withdraw}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadAllUsers })(UserCard);
