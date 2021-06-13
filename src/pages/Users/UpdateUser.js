import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { updateUser } from '../../store/actions/authActions';
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

class UpdateUser extends Component {

    state = {
        name: '', 
        orgName: '', 
        bkash: '', 
        address: '',
        success: false
    }

    componentDidMount() {
        this.setState({
            name: this.props.user.name, 
            orgName: this.props.user.orgName, 
            bkash: this.props.user.bkash, 
            address: this.props.user.address, 
        })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let { name, orgName, bkash, address } = this.state;
        this.props.updateUser(this.props.user._id, { name, orgName, bkash, address })
        if (name !== '' && orgName !== '' && bkash !== '' && address !== '') {
            this.setState({
                success: true
            })
        }
        this.notify();
    }

    notify = () => {
        let customId = "updateUser";
        toast.success("User has been updated successfully", {
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
        let { name, orgName, bkash, address, success } = this.state;

        return (
            <Modal
                className="Modal"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h4>Update User</h4>
                {
                    success && <ToastContainer className="update-toast-container" />
                }
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
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
                        <label htmlFor="orgName">Organization:</label>
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
                        <label htmlFor="bkash">Bkash Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="bkash"
                            id="bkash"
                            placeholder="Enter Bkash Number"
                            value={bkash}
                            onChange={this.changeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            placeholder="Enter Address"
                            value={address}
                            onChange={this.changeHandler}
                            required
                        />
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

export default connect(null, { updateUser })(UpdateUser);