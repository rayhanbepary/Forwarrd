import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({title, paragraph}) => {
    return (
        <div className="banner-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-12">
                        <div className="display-table">
                            <div className="table-cell">
                                <div className="banner-content">
                                    <h3>{title}</h3>
                                    <p>{paragraph}</p>
                                    <Link to="/signup" className="signup-btn">Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;