import React, { Component } from 'react';

class DetailsWrapper extends Component {
    render() {

        let { user } = this.props;

        return (
            <div className="details-wrapper">
                <div className="user-details-admin-main details" style={{marginBottom: "10px",marginTop: "20px"}}>
                    <h4 style={{marginBottom: "20px"}}>Hey, I am <span style={{color: '#008000'}}>{user.name}</span></h4> <hr/>
                    <span className="detail"><span style={{fontWeight: "bold"}}>Phone:</span> {user.phone}</span>
                    <span className="detail"><span style={{fontWeight: "bold"}}>Bkash:</span> {user.bkash}</span>
                    <span className="detail"><span style={{fontWeight: "bold"}}>Email:</span> {user.email}</span>
                </div>
                <div className="user-details-admin details">
                    <span className="detail"><span style={{fontWeight: "bold"}}>Organization:</span> {user.orgName}</span>
                    <span className="detail"><span style={{fontWeight: "bold"}}>Address:</span> {user.address}</span>
                </div>
                <div className="mt-4">
                    <button className="btn btn-success mr-3 mb-3">Deposit: {user.deposit}</button>
                    <button className="btn btn-danger mr-3 mb-3">Withdraw: {user.withdraw}</button>
                    <button className="btn btn-primary mb-3">Balance: {user.balance}</button>
                </div>
            </div>
        );
    }
}

export default DetailsWrapper;