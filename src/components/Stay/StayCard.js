import React, { Component } from 'react';

class StayCard extends Component {
    render() {
        return (
            <div className="col-lg-3 col-md-6">
                <div className="stay-container">
                    <div className="icon">
                        <img src={this.props.stay.icon} alt="" />
                    </div>
                    <div className="text">
                        <h4 className="text-center">{this.props.stay.title}</h4>
                        <p className="text-center">{this.props.stay.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default StayCard;