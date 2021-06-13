import React, { Component } from 'react';

class HowWorksCard extends Component {
    render() {
        return (
            <div className="col-lg-4 col-md-6">
                <div className="sequent-container">
                    <div className="sequent">
                        <h4>{this.props.sequent.sequent}</h4>
                    </div>
                    <div className="sequent-text">
                        <p>{this.props.sequent.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default HowWorksCard;