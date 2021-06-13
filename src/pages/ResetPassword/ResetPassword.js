import React, { Component } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../../store/actions/authActions';

class ResetPassword extends Component {

    state = {
        newPassword: '',
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
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let { newPassword, confirmPassword } = this.state
        const {token} = this.props.match.params;
        this.props.resetPassword({ newPassword, confirmPassword, resetLink: token }, this.props.history)
    }


    render() {

        document.title = "Reset Password | Forwarrd"

        let { newPassword, confirmPassword, error  } = this.state;

        return (
            <div className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 login-container">
                            <Link to="/">
                                <img src={Logo} alt="Company Logo"/>
                            </Link>
                            <h4>Reset Your Password</h4>
                            <p style={{color: "#646e73",fontSize: "14px"}}>Enter your new password. After confirming, you will be asked to log in again.</p>

                            <form onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        name="newPassword"
                                        className={error.newPassword ? "form-control is-invalid" : "from-box"} 
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={this.changeHandler}
                                    />
                                    {error.newPassword &&
                                        <div className="invalid-feedback">{error.newPassword}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        name="confirmPassword"
                                        className={error.confirmPassword ? "form-control is-invalid" : "from-box"} 
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={this.changeHandler}
                                    />
                                    {error.confirmPassword &&
                                        <div className="invalid-feedback">{error.confirmPassword}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="submit" 
                                        className="from-box" 
                                        value="Reset password"
                                    />
                                    <small>Never mind!
                                        <Link to="/login"> Take me back to login</Link>
                                    </small>
                                </div>
                            </form>

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

export default connect(mapStateToProps, { resetPassword })(ResetPassword);