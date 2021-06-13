import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import AccountDetails from './AccountDetails';
import { connect } from 'react-redux';
import UserAccount from '../UserAccount/UserAccount';
import CollectorAccount from '../../components/CollectorDashboard/CollectorAccount';

class Account extends Component {
    render() {

        let {user} = this.props.auth;

        document.title = `${user.name} | Forwarrd`

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="My Profile" toggle="nav-toggle"></AdminHeader>
                {
                    user.isAdmin &&
                    <AccountDetails></AccountDetails> 
                }
                {
                    user.isCollector && 
                    <CollectorAccount></CollectorAccount>
                }
                { 
                    user.isUser && 
                    <UserAccount></UserAccount>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Account);