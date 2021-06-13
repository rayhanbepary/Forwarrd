import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createWithdraw } from '../../store/actions/withdrawActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class WithdrawForm extends Component {


    state = {
        bkash: '', 
        amount: 0,
        success: false,
        error: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.withdraws.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.withdraws.error
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
        let { bkash, amount} = this.state
        let { user } = this.props.auth;
        this.props.createWithdraw({name: user.name, orgName: user.orgName, phone: user.phone, bkash, amount})
        this.setState({
            bkash: '', 
            amount: 0,
            error: {}
        })
        if (bkash !== '' && amount > 0 && amount <= 1000) {
            this.setState({
                success: true
            })
        }
        this.notify()
    }

    notify = () => {
        let customId = "withdrawSuccess";
        toast.success("Your request has been sent successfully", {
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

        let { bkash, success, error } = this.state;
        let { user } = this.props.auth;

        return (
            <div className="user-main">
                <div className="all-withdraw-table">
                    <div className="recent-withdraw">
                        <div style={{marginTop: "130px",paddingLeft: "15px"}}>
                            <h4>Send a withdraw request.</h4>
                            <p>You can't withdraw more than one thousand by one request.</p>
                            {
                                success && <ToastContainer className="toast-container" />
                            }
                        </div>
                        <div className="recent-card-body">
                                <form onSubmit={this.submitHandler}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="name">Name:</label>
                                                <input
                                                    type="text"
                                                    className={error.name ? "form-control is-invalid" : "form-control"}
                                                    name="name"
                                                    id="name"
                                                    placeholder="Enter Your Name"
                                                    defaultValue={user.name}
                                                    onChange={this.changeHandler}
                                                    disabled
                                                />
                                                {error.name &&
                                                    <div className="invalid-feedback">{error.name}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="orgName">Organization:</label>
                                                <input
                                                    type="text"
                                                    className={error.orgName ? "form-control is-invalid" : "form-control"}
                                                    name="orgName"
                                                    id="orgName"
                                                    placeholder="Enter Your Organization Name"
                                                    defaultValue={user.orgName}
                                                    onChange={this.changeHandler}
                                                    disabled
                                                />
                                                {error.orgName &&
                                                    <div className="invalid-feedback">{error.orgName}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone Number:</label>
                                                <input
                                                    type="text"
                                                    className={error.phone ? "form-control is-invalid" : "form-control"}
                                                    name="phone"
                                                    id="phone"
                                                    placeholder="Enter Your Phone Number"
                                                    defaultValue={user.phone}
                                                    onChange={this.changeHandler}
                                                    disabled
                                                />
                                                {error.phone &&
                                                    <div className="invalid-feedback">{error.phone}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="bkash">Bkash Number:</label>
                                                <input
                                                    type="text"
                                                    className={error.bkash ? "form-control is-invalid" : "form-control"}
                                                    name="bkash"
                                                    id="bkash"
                                                    placeholder="Enter Your Bkash Number"
                                                    value={bkash}
                                                    onChange={this.changeHandler}
                                                    required
                                                />
                                                {error.bkash &&
                                                    <div className="invalid-feedback">{error.bkash}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="amount">Amount:</label>
                                                <input
                                                    type="number"
                                                    className={error.amount ? "form-control is-invalid" : "form-control"}
                                                    name="amount"
                                                    id="amount"
                                                    placeholder="Enter Your Withdraw Amount"
                                                    onChange={this.changeHandler}
                                                    required
                                                />
                                                {error.amount &&
                                                    <div className="invalid-feedback">{error.amount}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                    >
                                        Withdraw
                                    </button>
                                </form>
                        </div>
                    </div>
                </div>
                <div className="dashboard-footer" style={{marginTop: "80px"}}>
                    <footer>
                        <p>{new Date().getFullYear()} &copy; Forwarrd.com</p>
                    </footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    withdraws: state.withdraws
})

export default connect(mapStateToProps, { createWithdraw })(WithdrawForm);