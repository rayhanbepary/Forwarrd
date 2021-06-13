import React, { Component } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';

class Login extends Component {


    state = {
        phone: '',
        password: '',
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
        let { phone, password } = this.state
        this.props.login({ phone, password }, this.props.history)
    }


    render() {

        document.title = "Login | Forwarrd"

        let { phone, password, error } = this.state;

        return (
            <div className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 login-container">
                            <Link to="/">
                                <img src={Logo} alt="Company Logo"/>
                            </Link>
                            <h4>Log in to Forwarrd</h4>
                            <form onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="phone"
                                        className={error.phone ? "form-control is-invalid" : "from-box"} 
                                        placeholder="Username or Phone number"
                                        value={phone}
                                        onChange={this.changeHandler}
                                    />
                                    {error.phone &&
                                        <div className="invalid-feedback">{error.phone}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        name="password"
                                        className={error.password ? "form-control is-invalid" : "from-box"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={this.changeHandler}
                                    />
                                    {error.password &&
                                        <div className="invalid-feedback">{error.password}</div>
                                    }
                                    <small>
                                        <Link 
                                            to="/login/forgot-password" 
                                            style={{color: '#d6c5c5',textDecoration: 'none'}}>
                                                Forgot Password ?
                                            </Link>
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="submit" 
                                        className="from-box" 
                                        value="Log in"
                                    />
                                    <small>Don't have an account ?
                                        <Link to="/signup"> Create an account</Link>
                                    </small>
                                </div>
                                <p> {error.message} </p>
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

export default connect(mapStateToProps, {login})(Login);