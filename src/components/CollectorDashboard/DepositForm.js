import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewDeposit } from '../../store/actions/depositActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DepositForm extends Component {


    state = {
        name: '', 
        orgName: '', 
        client: '', 
        amount: 0, 
        quantity: 0, 
        type: '',
        success: false,
        error: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.deposits.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.deposits.error
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
        let { name, orgName, client, amount, quantity, type } = this.state;
        this.props.addNewDeposit({ name, orgName, client, amount, quantity, type })
        this.setState({
            name: '', 
            orgName: '', 
            client: '', 
            amount: 0, 
            quantity: 0, 
            type: '',
            error: {}
        })
        if (name !== '' && orgName !== '' && client !== '' && amount > 0 && quantity > 0 && type !== '') {
            this.setState({
                success: true
            })
        }
        this.notify()

    }

    notify = () => {
        let customId = "collectionSuccess";
        toast.success("A new deposit has been added successfully", {
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

        let { name, orgName, client, amount, quantity, error, success } = this.state;

        return (
            <div className="user-main">
                 <div className="all-withdraw-table">
                    <div className="recent-withdraw">
                        <div style={{marginTop: "130px",paddingLeft: "15px"}}>
                            <h4>Add New Deposit</h4>
                            {
                                success && <ToastContainer className="toast-container" />
                            }
                        </div>
                        <div className="recent-card-body">
                                <form onSubmit={this.submitHandler}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="name">Client Name:</label>
                                                <input
                                                    type="text"
                                                    className={error.name ? "form-control is-invalid" : "form-control"}
                                                    name="name"
                                                    id="name"
                                                    placeholder="Enter Client Name"
                                                    value={name}
                                                    onChange={this.changeHandler}
                                                    required
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
                                                    placeholder="Enter Organization Name"
                                                    value={orgName}
                                                    onChange={this.changeHandler}
                                                    required
                                                />
                                                {error.orgName &&
                                                    <div className="invalid-feedback">{error.orgName}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="client">Phone Number:</label>
                                                <input
                                                    type="text"
                                                    className={error.client ? "form-control is-invalid" : "form-control"}
                                                    name="client"
                                                    id="client"
                                                    placeholder="Enter Client Phone Number"
                                                    value={client}
                                                    onChange={this.changeHandler}
                                                    required
                                                />
                                                {error.client &&
                                                    <div className="invalid-feedback">{error.client}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="amount">Amount:</label>
                                                <input
                                                    type="number"
                                                    className={error.amount ? "form-control is-invalid" : "form-control"}
                                                    name="amount"
                                                    id="amount"
                                                    placeholder="Enter Deposit Amount"
                                                    value={amount}
                                                    onChange={this.changeHandler}
                                                    required
                                                />
                                                {error.amount &&
                                                    <div className="invalid-feedback">{error.amount}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="quantity">Quantity:</label>
                                                <input
                                                    type="number"
                                                    className={error.quantity ? "form-control is-invalid" : "form-control"}
                                                    name="quantity"
                                                    id="quantity"
                                                    placeholder="Enter Deposit Quantity"
                                                    value={quantity}
                                                    onChange={this.changeHandler}
                                                    required
                                                />
                                                {error.quantity &&
                                                    <div className="invalid-feedback">{error.quantity}</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <select
                                                    className={error.type ? "form-control is-invalid" : "form-control"}
                                                    onChange={this.changeHandler}
                                                    name='type'
                                                    required
                                                >
                                                    <option> Select A Type </option>
                                                    <option value="PET"> PET </option>
                                                    <option value="PP">PP</option>
                                                </select>
                                                {error.type &&
                                                    <div className="invalid-feedback">{error.type}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                    >
                                        Deposit
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
    deposits: state.deposits
})

export default connect(mapStateToProps, { addNewDeposit })(DepositForm);