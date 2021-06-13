import React, { Component } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';

class Signup extends Component {

    state = {
        name: '', 
        email: '', 
        phone: '', 
        bkash: '', 
        orgName: '', 
        address: '', 
        agreement: '', 
        password: '', 
        confirmPassword: '', 
        error: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.auth.error
            }
        }
        return null;
    }

    changeHandler = (event) => {
        if (event.target.type === 'checkbox') {
            this.setState({
                ...this.state,
                agreement: event.target.value
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

    }

    submitHandler = (event) => {
        event.preventDefault();
        let { name, email, phone, bkash, orgName, address, agreement, password, confirmPassword } = this.state;
        this.props.register({
            name, 
            email, 
            phone, 
            bkash, 
            orgName, 
            address, 
            agreement, 
            password, 
            confirmPassword 
        }, this.props.history)
    }


    render() {

        document.title = "Sign up | Forwarrd"

        let { name, email, phone, bkash, orgName, address, password, confirmPassword, error } = this.state;

        return (
            <div className="signup-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/">
                                <img src={Logo} alt="Company Logo"/>
                            </Link>
                            <h4>Sign up to Forwarrd</h4>
                        </div>
                    </div>
                    <div className="sign-up-form">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <p>Please fill in the fields with valid information. Fields marked with an * are required</p>
                                <form onSubmit={this.submitHandler}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input 
                                                    type="text" 
                                                    name="name" 
                                                    className={error.name ? "form-control is-invalid" : "from-box"} 
                                                    placeholder="Name *"
                                                    value={name}
                                                    onChange={this.changeHandler}
                                                />
                                                {error.name &&
                                                    <div className="invalid-feedback">{error.name}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="text" 
                                                    name="phone" 
                                                    className={error.phone ? "form-control is-invalid" : "from-box"} 
                                                    placeholder="Phone Number *"
                                                    value={phone}
                                                    onChange={this.changeHandler}
                                                />
                                                {error.phone &&
                                                    <div className="invalid-feedback">{error.phone}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="text" 
                                                    name="bkash" 
                                                    className={error.bkash ? "form-control is-invalid" : "from-box"} 
                                                    placeholder="Bkash Number *"
                                                    value={bkash}
                                                    onChange={this.changeHandler}
                                                />
                                                {error.bkash &&
                                                    <div className="invalid-feedback">{error.bkash}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    className={error.email ? "form-control is-invalid" : "from-box"}
                                                    placeholder="Email *"
                                                    value={email}
                                                    onChange={this.changeHandler}
                                                />
                                                {error.email &&
                                                    <div className="invalid-feedback">{error.email}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input 
                                                    type="text" 
                                                    name="orgName" 
                                                    className={error.orgName ? "form-control is-invalid" : "from-box"} 
                                                    placeholder="Name of Organization *"
                                                    value={orgName}
                                                    onChange={this.changeHandler}
                                                />
                                                {error.orgName &&
                                                    <div className="invalid-feedback">{error.orgName}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="text" 
                                                    name="address" 
                                                    className={error.address ? "form-control is-invalid" : "from-box"} 
                                                    placeholder="Address of Organization *"
                                                    value={address}
                                                    onChange={this.changeHandler}
                                                />
                                                {error.address &&
                                                    <div className="invalid-feedback">{error.address}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    name="password" 
                                                    className={error.password ? "form-control is-invalid" : "from-box"} 
                                                    placeholder="Password *"
                                                    value={password}
                                                    onChange={this.changeHandler}
                                                />
                                                {error.password &&
                                                    <div className="invalid-feedback">{error.password}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    name="confirmPassword" 
                                                    className={error.confirmPassword ? "form-control is-invalid" : "from-box"}
                                                    placeholder="Confirm Password *"
                                                    value={confirmPassword}
                                                    onChange={this.changeHandler}
                                                />
                                                {error.confirmPassword &&
                                                    <div className="invalid-feedback">{error.confirmPassword}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group form-check">
                                            <input 
                                                type="checkbox" 
                                                className={error.agreement ? "form-control is-invalid" : "form-check-input"}
                                                id="exampleCheck1"
                                                name="agreement"
                                                value= "Accepted"
                                                onChange={this.changeHandler}
                                            />
                                            <label className="form-check-label" htmlFor="exampleCheck1" style={{fontSize:'14px'}}>
                                                I agree to the  
                                                <span style={{color: "#fc0707"}}> Terms & Conditions</span> and 
                                                <span style={{color: "#fc0707"}}> Privacy policy.</span>
                                            </label>
                                            {error.agreement &&
                                                <div className="invalid-feedback">{error.agreement}</div>
                                            }
                                        </div>
                                        
                                    </div>
                                    <p>{error.message}</p>
                                    <div className="form-group">
                                        <input 
                                            type="submit" 
                                            className="from-box" 
                                            value="Submit"
                                        />
                                    </div>
                                </form>
                            </div>
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

export default connect(mapStateToProps, {register})(Signup);