import React, { Component } from 'react';
import Logo from '../../images/logo.png';
import { FaAlignRight } from 'react-icons/fa';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../../store/actions/authActions';

class Navigation extends Component {
    
    render() {

        const signupStyles = {
            backgroundColor: '#008000',
            padding: '10px 30px',
            borderRadius: '5px'
        }

        return (
            <div className="nav-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <Link className="navbar-brand logo" to="/">
                                    <img src={Logo} alt="logo" style={{width: '50%',height: 'auto'}}/>
                                </Link>
                                <button className="navbar-toggler toggler-button" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <FaAlignRight className="nav-icon"/>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName='active' to="/">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName='active' to="/about">About</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName='active' to="/contact">Contact</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" activeClassName='active' to="/login">Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link sign-up" activeClassName='active' style={signupStyles} to="/signup">Sign up</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(withRouter(Navigation));