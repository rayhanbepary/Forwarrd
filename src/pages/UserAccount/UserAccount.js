import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateUserAccount from './UpdateUserAccount';
import ChangeUserPassword from './ChangeUserPassword';

class UserAccount extends Component {

    state = {
        updateModalOpen: false,
        ChangePasswordModalOpen: false
    }

    openUpdateModal = () => {
        this.setState({
            updateModalOpen: true
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false
        })
    }

    openChangePasswordModal = () => {
        this.setState({
            ChangePasswordModalOpen: true
        })
    }

    closeChangePasswordModal = () => {
        this.setState({
            ChangePasswordModalOpen: false
        })
    }

    render() {

        let {user} = this.props.auth;

        return (
            <div className="user-main">
                <div className="mb-5" style={{marginTop: "100px",padding: "30px 20px"}}>
                    <button className="btn btn-success mr-4 mb-3" onClick={this.openUpdateModal}>Update Profile</button>
                        <UpdateUserAccount
                            isOpen={this.state.updateModalOpen}
                            close={this.closeUpdateModal}
                            user={user}
                        ></UpdateUserAccount>
                    <button className="btn btn-warning mb-3" onClick={this.openChangePasswordModal}>Change Password</button>
                    <ChangeUserPassword
                        isOpen={this.state.ChangePasswordModalOpen}
                        close={this.closeChangePasswordModal}
                    ></ChangeUserPassword>
                </div>
                <div className="user-details-wrapper">
                    <div className="user-first-details">
                        <h4 style={{marginBottom: "20px"}}>Hey, I am <span style={{color: '#008000'}}>{user.name}</span></h4> <hr/>
                        <span className="detail"><span style={{fontWeight: "bold"}}>Phone:</span> {user.phone}</span>
                        <span className="detail"><span style={{fontWeight: "bold"}}>Bkash:</span> {user.bkash}</span>
                        <span className="detail"><span style={{fontWeight: "bold"}}>Email:</span> {user.email}</span>
                    </div>
                    <div className="user-second-details details">
                        <span className="detail"><span style={{fontWeight: "bold"}}>Address:</span> {user.address}</span>
                        <span className="detail"><span style={{fontWeight: "bold"}}>Organization:</span> {user.orgName}</span>
                    </div>
                </div>
                <div className="dashboard-footer" style={{marginTop: "130px"}}>
                    <footer>
                        <p>{new Date().getFullYear()} &copy; Forwarrd.com</p>
                    </footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(UserAccount);