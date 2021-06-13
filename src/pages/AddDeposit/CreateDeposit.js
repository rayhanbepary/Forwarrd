import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addNewDeposit } from '../../store/actions/depositActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')

class CreateDeposit extends Component {

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
        this.notify();

    }

    notify = () => {
        let customId = "depositSuccess";
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
            <Modal
                className="Modal"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h4>Create A New Deposit</h4>
                {
                    success && <ToastContainer className="add-toast-container" />
                }
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            className={error.name ? "form-control is-invalid" : "form-control"}
                            name="name"
                            id="name"
                            placeholder="Enter Client Name"
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
                            className={error.orgName ? "form-control is-invalid" : "form-control"}
                            name="orgName"
                            id="orgName"
                            placeholder="Enter Organization Name"
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
                            className={error.client ? "form-control is-invalid" : "form-control"}
                            name="client"
                            id="client"
                            placeholder="Enter Client Phone Number"
                            value={client}
                            onChange={this.changeHandler}
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
                        >
                            <option> Select A Type </option>
                            <option value="PET"> PET </option>
                            <option value="PP">PP</option>
                        </select>
                        {error.type &&
                            <div className="invalid-feedback">{error.type}</div>
                        }
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Submit
                    </button>

                </form>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    deposits: state.deposits
})

export default connect(mapStateToProps, { addNewDeposit })(CreateDeposit);