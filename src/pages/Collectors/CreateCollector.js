import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addNewCollector } from '../../store/actions/collectorActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    content: {
        top: '56%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')

class CreateCollector extends Component {

    state = {
        name: '', 
        email: '', 
        phone: '', 
        address: '', 
        role: '', 
        password: '',
        confirmPassword: '',
        success: false,
        error: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.collectors.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.collectors.error
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
        let { name, email, phone, address, role, password, confirmPassword } = this.state;
        this.props.addNewCollector({ name, email, phone, address, role, password, confirmPassword })
        this.setState({
            name: '', 
            email: '', 
            phone: '', 
            address: '', 
            role: '', 
            password: '',
            confirmPassword: '',
            error: {}
        })
        if (name !== '' && email !== '' && phone !== '' && address !== '' && role !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword ) {
            this.setState({
                success: true
            })
        }
        this.notify();
    }

    notify = () => {
        let customId = "addCollector";
        toast.success("A new Collector has been added successfully", {
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

        let { name, email, phone, address, password, confirmPassword, error, success } = this.state;

        return (
            <Modal
                className="Modal"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h4>Create A New Collector</h4>
                { error.message && <p> {error.message} </p> }
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
                            placeholder="Enter Collector Name"
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
                            className={error.email ? "form-control is-invalid" : "form-control"}
                            name="email"
                            id="email"
                            placeholder="Enter Collector Email"
                            value={email}
                            onChange={this.changeHandler}
                        />
                        {error.email &&
                            <div className="invalid-feedback">{error.email}</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={error.phone ? "form-control is-invalid" : "form-control"}
                            name="phone"
                            id="phone"
                            placeholder="Enter Collector Phone Number"
                            value={phone}
                            onChange={this.changeHandler}
                        />
                        {error.phone &&
                            <div className="invalid-feedback">{error.phone}</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={error.address ? "form-control is-invalid" : "form-control"}
                            name="address"
                            id="address"
                            placeholder="Enter Collector Address"
                            value={address}
                            onChange={this.changeHandler}
                        />
                        {error.address &&
                            <div className="invalid-feedback">{error.address}</div>
                        }
                    </div>
                    <div className="form-group">
                        <select
                            className={error.role ? "form-control is-invalid" : "form-control"}
                            onChange={this.changeHandler}
                            name='role'
                        >
                            <option> Select A Role </option>
                            <option value="Collector">Collector</option>
                        </select>
                        {error.role &&
                            <div className="invalid-feedback">{error.role}</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={error.password ? "form-control is-invalid" : "form-control"}
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={this.changeHandler}
                        />
                        {error.password &&
                            <div className="invalid-feedback">{error.password}</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={error.confirmPassword ? "form-control is-invalid" : "form-control"}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter Confirm Password"
                            value={confirmPassword}
                            onChange={this.changeHandler}
                        />
                        {error.confirmPassword &&
                            <div className="invalid-feedback">{error.confirmPassword}</div>
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
    collectors: state.collectors
})

export default connect(mapStateToProps, {addNewCollector})(CreateCollector);