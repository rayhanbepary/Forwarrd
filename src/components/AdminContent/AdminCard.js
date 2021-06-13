import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllUsers } from '../../store/actions/authActions';
import Axios from 'axios';

class AdminCard extends Component {

    state = {
        admin: {}
    }

    componentDidMount() {
        this.props.loadAllUsers();
        this.getAllAdmins();
    }

    getAllAdmins () {
        Axios.get('https://forwarrd.herokuapp.com/api/admins/all/admins')
        .then(response => {
            let allAdmins = response.data;
            const { user } = this.props.auth;
            if (allAdmins) {
                let mainAdmin = allAdmins.find(admin => admin._id === user._id);
                if(!mainAdmin){
                    return null;
                }
                this.setState({ admin: mainAdmin});
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    render() {

        let {auth} = this.props;
        let { admin } = this.state

        return (
            <div className="admin-card">
                <div className="card-single">
                    <div>
                        { 
                            !auth.allUser ?
                            <p>Users Loading</p> :
                            <h4>{auth.allUser.length}</h4>
                        }
                        <span>Users</span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h4>{admin.wasteQuantity} <span style={{fontSize: "16px"}}>kg</span></h4>
                        <span>Quantity of Waste</span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h4>{admin.userAmount} <span style={{fontSize: "16px"}}>tk</span></h4>
                        <span>Income of Users</span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h4>{admin.userWithdraw} <span style={{fontSize: "16px"}}>tk</span></h4>
                        <span>Withdraw of Users</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadAllUsers })(AdminCard);
