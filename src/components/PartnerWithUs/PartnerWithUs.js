import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PartnerWithUs extends Component {
    render() {
        return (
            <section className={`${window.location.pathname === '/' ? 'partner-wrapper-home' : 'partner-wrapper'}`}>
                <div className="container partner-container">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-sm-12 partner-content">
                            <h2>partner with us</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal of letters, as opposed to using 'Content here, content here' it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default text, and a search for 'lorem ipsum' will uncover man web sites in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
                            <Link to="/signup" className="stay-signup-btn">Sign up</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default PartnerWithUs;