import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import AdminMain from '../../components/AdminContent/AdminMain';
import Sidebar from '../../components/Sidebar/Sidebar';
import { connect } from 'react-redux';
import UserDashboard from '../../components/UserDashboard/UserDashboard';
import CollectorDashboard from '../../components/CollectorDashboard/CollectorDashboard';

class Dashboard extends Component {

    render() {

        document.title = "Forwarrd"

        let { user } = this.props.auth;

        return (
            <>
            {
                user.isUser && 
                <>
                    <UserDashboard></UserDashboard>
                </>
            }
            {
               user.isAdmin && 
               <>
                    <Sidebar></Sidebar>
                    <AdminHeader title="Dashboard" toggle="nav-toggle"></AdminHeader>
                    <AdminMain></AdminMain>
                </>
            }
            {
                user.isCollector && 
                <>
                    <CollectorDashboard></CollectorDashboard>
                </>
            }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Dashboard);