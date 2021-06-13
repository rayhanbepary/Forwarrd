import React, { Component } from 'react';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaRegClock } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { Link } from 'react-router-dom';

class Topnav extends Component {
    render() {
        return (
            <div className="top-nav-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="topNav-social-link">
                                <ul>
                                    <Link className="social-link" to="#"><FaLinkedinIn/></Link>
                                    <Link className="social-link" to="#"><FaInstagram/></Link>
                                    <Link className="social-link" to="#"><FaFacebookF/></Link>
                                    <Link className="social-link" to="#"><FaTwitter/></Link>
                                </ul>
                                <span className="office-hours">
                                    <span><FaRegClock className="mr-2"/>Office hours 9AM-5PM</span>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 text-right smAlign topNav-text">
                            <span>
                                <span className="phone"><FaPhone className="mr-2"/>01732463274</span>
                                <span className="email"><MdMail className="mr-2" style={{fontSize: "18px"}}/>info.forwarrd@gmail.com</span> 
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topnav;