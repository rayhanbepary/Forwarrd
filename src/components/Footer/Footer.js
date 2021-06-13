import React, { Component } from 'react';
import Logo from '../../images/logo2.png';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter, FaPhone } from 'react-icons/fa';
import { MdMail, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="footer-wrapper">
                <div className="container top-footer">
                    <div className="row">
                        <div className="clo-lg-3 col-md-3 col-sm-12">
                            <div className="single-footer-content first-footer-content">
                                <img src={Logo} alt="Company Logo"/>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
                                <div className="footer-social-link">
                                    <ul>
                                        <Link className="social-link" to="#"><FaLinkedinIn/></Link>
                                        <Link className="social-link" to="#"><FaInstagram/></Link>
                                        <Link className="social-link" to="#"><FaFacebookF/></Link>
                                        <Link className="social-link" to="#"><FaTwitter/></Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="clo-lg-3 col-md-3 col-sm-12">
                            <div className="single-footer-content">
                                <h4 className="quick">Quick Links</h4>
                                <div className="footer-quick-link">
                                    <ul>
                                        <li>
                                            <Link className="quick-link" to="/about">About us</Link>
                                        </li>
                                        <li>
                                            <Link className="quick-link" to="/contact">Contact us</Link>
                                        </li>
                                        <li>
                                            <Link className="quick-link" to="/privacy">Privacy Policy</Link>
                                        </li>
                                        <li>
                                            <Link className="quick-link" to="/terms-conditions">Terms & Conditions</Link>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="clo-lg-3 col-md-3 col-sm-12">
                            <div className="single-footer-content">
                                <h4 className="service">Our Services</h4>
                                <div className="footer-service-link">
                                    <ul>
                                        <li>
                                            <Link className="service-link" to="#">Recycling Plastic Waste</Link>
                                        </li>
                                        <li>
                                            <Link className="service-link" to="#">Regen Vermicompost</Link>
                                        </li>
                                        <li>
                                            <Link className="service-link" to="#">Zero Waste Consultancy</Link>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="clo-lg-3 col-md-3 col-sm-12">
                            <div className="single-footer-content">
                                <h4 className="footer-contact">Contact Us</h4>
                                <span><FaPhone className="mr-2 icon"/> 01732463274</span>
                                <br/>
                                <span><MdMail className="mr-2 icon"/> info.forwarrd@gmail.com</span>
                                <br/>
                                <span><MdLocationOn className="mr-2 icon"/>Dhaka-1000, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container copyright-text">
                    <div className="row">
                        <div className="col-md-12">
                            <p>{new Date().getFullYear()} &copy; Forwarrd. Designed by Mrbsoft.</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;