import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { removeOneCollector } from '../../store/actions/collectorActions';
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

class RemoveCollector extends Component {

    state = {
        success: false
    }

    removeHandler = () => {
        this.props.removeOneCollector(this.props.collector._id)
        this.setState({
            success: true
        })
        this.notify();
    }

    notify = () => {
        let customId = "removeCollector";
        toast.success("Collector has been removed successfully", {
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
        let { success } = this.state;

        return (
            <Modal
                className="Modal"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h6>Really ! Do you want to remove this collector ?</h6>
                {
                    success && <ToastContainer className="update-toast-container" />
                }

                    <button 
                        className="btn btn-primary mr-3 mt-3"
                        onClick={this.props.close}
                    >
                        Cancel
                    </button>
                    <button 
                        className="btn btn-warning mt-3"
                        onClick={this.removeHandler}
                    >
                        Confirm
                    </button>
            </Modal>
        );
    }
}

export default connect(null, { removeOneCollector })(RemoveCollector);