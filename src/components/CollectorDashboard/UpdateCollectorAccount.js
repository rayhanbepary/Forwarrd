import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { updateCollectorProfile } from '../../store/actions/collectorActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
Modal.setAppElement('#root')

class UpdateCollectorAccount extends Component {

    state = {
        name: '', 
        address: '',
        success: false
    }

    componentDidMount() {
        this.setState({
            name: this.props.collector.name,  
            address: this.props.collector.address
        })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let { name, address } = this.state;
        this.props.updateCollectorProfile(this.props.collector._id, { name, address })
        if (name !== '' && address !== '') {
            this.setState({
                success: true
            })
        }
        this.notify();
    }

    notify = () => {
        let customId = "updateAdminAccount";
        toast.success("Your account has been updated successfully", {
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

        let { name, address, success } = this.state;

        return (
            <Modal
                className="Modal"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h4>Update Profile</h4>
                {
                    success && <ToastContainer className="update-toast-container" />
                }
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="address">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            placeholder="Enter Name"
                            value={name}
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

export default connect(null, { updateCollectorProfile })(UpdateCollectorAccount);