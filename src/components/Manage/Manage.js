import React, { Component } from 'react';
import WasteImg from '../../images/waste.png';
import { Link } from 'react-router-dom';

class Manage extends Component {
    render() {
        return (
            <div className={`${window.location.pathname === '/' ? 'manage-waste-wrapper' : 'about-wrapper'}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={WasteImg} alt="" className="waste-img" width="90%" height="auto"/>
                        </div>
                        <div className="col-md-6">
                            <div className="manage-or-about-content">
                                <h2>{this.props.title}</h2>
                                <p>{this.props.description}</p>
                                <Link to="/signup" className="signup-btn">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Manage;