import React, { Component } from 'react';
import Modal from 'react-modal';
import Axios from 'axios';
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

class UpdateCounter extends Component {

    state = {
        wasteQuantity: 0, 
        recyclingPercent: 0, 
        livesImpact: 0,
        success: false
    }

    componentDidMount() {
        this.setState({
            wasteQuantity: this.props.counter.wasteQuantity, 
            recyclingPercent: this.props.counter.recyclingPercent, 
            livesImpact: this.props.counter.livesImpact 
        })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let { wasteQuantity, recyclingPercent, livesImpact } = this.state;
        
        Axios.put(`https://forwarrd.herokuapp.com/api/counter/${this.props.counter._id}`,{ wasteQuantity, recyclingPercent, livesImpact })
        .then(response => {
            let counter = response.data;
        })
        .catch(error => {
            console.log(error);
        })

        if ( wasteQuantity !== 0 && recyclingPercent !== 0 && livesImpact !== 0 ) {
            this.setState({
                success: true
            })
        }
        this.notify();
    }

    notify = () => {
        let customId = "updateCounter";
        toast.success("Counter has been updated successfully", {
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
        let { wasteQuantity, recyclingPercent, livesImpact, success } = this.state;

        return (
            <Modal
                className="Modal"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h4>Update Counter</h4>
                {
                    success && <ToastContainer className="update-toast-container" />
                }
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="wasteQuantity">Waste Quantity:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="wasteQuantity"
                            id="wasteQuantity"
                            placeholder="Enter Waste Quantity"
                            value={wasteQuantity}
                            onChange={this.changeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recyclingPercent">Percent of Recycling:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="recyclingPercent"
                            id="recyclingPercent"
                            placeholder="Enter Percent of Recycling"
                            value={recyclingPercent}
                            onChange={this.changeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="livesImpact">Lives Impacted:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="livesImpact"
                            id="livesImpact"
                            placeholder="Lives Impacted"
                            value={livesImpact}
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

export default UpdateCounter;