import React, { Component } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword } from '../../store/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ForgotPassword extends Component {

    state = {
        email: '',
        success: false
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let { email } = this.state
        this.props.forgotPassword({email})
        this.setState({
            email: ''
        })
        if ( email !== '') {
            this.setState({
                success: true
            })
        }
        this.notify()
    }


    notify = () => {
        let customId = "forgotPassword";
        toast.success("Check your email", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: customId
        })
    };

    render() {

        document.title = "Forgot Password | Forwarrd"

        let { email, success } = this.state;

        return (
            <div className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 login-container">
                            <Link to="/">
                                <img src={Logo} alt="Company Logo"/>
                            </Link>
                            <h4>Reset Your Password</h4>
                            {
                                success && <ToastContainer className="toast-container" />
                            }
                            <p style={{color: "#646e73",fontSize: "14px"}}>To reset your password, enter the email address you used to sign up.</p>
                            <form onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        name="email"
                                        className="from-box"
                                        placeholder="Email"
                                        value={email}
                                        onChange={this.changeHandler}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="submit" 
                                        className="from-box" 
                                        value="Get reset link"
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

export default connect(null, { forgotPassword })(ForgotPassword);