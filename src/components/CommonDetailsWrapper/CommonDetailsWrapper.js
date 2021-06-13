import React, { Component } from 'react';

class CommonDetailsWrapper extends Component {
    render() {

        let { collectorOrAdmin } = this.props;

        return (
            <div className="details-wrapper">
                <div className="first-details">
                    <h4 style={{marginBottom: "20px"}}>Hey, I am <span style={{color: '#008000'}}>{collectorOrAdmin.name}</span></h4> <hr/>
                    <span className="detail"><span style={{fontWeight: "bold"}}>Phone:</span> {collectorOrAdmin.phone}</span>
                    <span className="detail"><span style={{fontWeight: "bold"}}>Email:</span> {collectorOrAdmin.email}</span>
                </div>
                <div className="second-details details">
                    <span className="detail"><span style={{fontWeight: "bold"}}>Address:</span> {collectorOrAdmin.address}</span>
                    <span className="detail"><span style={{fontWeight: "bold"}}>Designation:</span> {collectorOrAdmin.role}</span>
                </div>
            </div>
        );
    }
}

export default CommonDetailsWrapper;