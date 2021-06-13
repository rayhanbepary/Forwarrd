import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { changePassword } from '../../store/actions/authActions';


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


class ChangeUserPassword extends Component {


    state = {
        currentPassword: '',
        newPassword: '',
        error: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.auth.error
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
        let { currentPassword, newPassword } = this.state
        this.props.changePassword(this.props.auth.user._id, { currentPassword, newPassword })
        this.setState({
            currentPassword: '',
            newPassword: '',
            error: {}
        })
    }


    render() {

        let { currentPassword, newPassword, error } = this.state;
        let {success} = this.props.auth;

        return (
            <Modal
                className="Modal"
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h4>Change Password</h4>
                <p className={success && "change-pass-success"}>{success}</p>

                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            className={!success ? "form-control is-invalid" : "form-control"}
                            name="currentPassword"
                            id="currentPassword"
                            placeholder="Enter Current Password"
                            value={currentPassword}
                            onChange={this.changeHandler}
                            required
                        />
                        { !success && 
                            <div className="invalid-feedback">{error.message}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter New Password"
                            value={newPassword}
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

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { changePassword })(ChangeUserPassword);