import React, { Component } from 'react';

class ServiceCard extends Component {
    render() {
        return (
            <div className="col-lg-4 col-md-6">
                <div className="service-container">
                    <div className="icon">
                        <img src={this.props.service.icon} alt="" />
                    </div>
                    <div className="text">
                        <h4>{this.props.service.title}</h4>
                        <p>{this.props.service.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceCard;