import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { updateDeposit } from '../../store/actions/depositActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
Modal.setAppElement('#root')

class UpdateDeposit extends Component {

    state = {
        name: '', 
        orgName: '', 
        client: '', 
        amount: 0, 
        quantity: 0, 
        type: '',
        success: false
    }

    componentDidMount() {
        this.setState({
            name: this.props.deposit.name, 
            orgName: this.props.deposit.orgName, 
            client: this.props.deposit.client, 
            amount: this.props.deposit.amount, 
            quantity: this.props.deposit.quantity, 
            type: this.props.deposit.type
        })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let { name, orgName, client, amount, quantity, type } = this.state;
        this.props.updateDeposit(this.props.deposit._id, { name, orgName, client, amount, quantity, type })
        if (  name !== '' && orgName !== '' && client !== '' && amount > 0 && quantity > 0 && type !== '') {
            this.setState({
                success: true
            })
        }
        this.notify();
    }

    notify = () => {
        let customId = "collectionUpdate";
        toast.success("Deposit has been updated successfully", {
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

        let { name, orgName, client, amount, quantity, success } = this.state;

        return (
            <Modal
                className="Modal"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h4>Update Deposit</h4>
                {
                    success && <ToastContainer className="update-toast-container" />
                }
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            placeholder="Enter Client Name"
                            value={name}
                            onChange={this.changeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="orgName"
                            id="orgName"
                            placeholder="Enter Organization Name"
                            value={orgName}
                            onChange={this.changeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="client"
                            id="client"
                            placeholder="Enter Client Phone Number"
                            value={client}
                            onChange={this.changeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="amount"
                            id="amount"
                            placeholder="Enter Deposit Amount"
                            value={amount}
                            onChange={this.changeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            id="quantity"
                            placeholder="Enter Deposit Quantity"
                            value={quantity}
                            onChange={this.changeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <select
                            className='form-control'
                            onChange={this.changeHandler}
                            name='type'
                            required
                        >
                            <option> Select A Type </option>
                            <option value="PET"> PET </option>
                            <option value="PP">PP</option>
                        </select>
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

export default connect(null, { updateDeposit })(UpdateDeposit);