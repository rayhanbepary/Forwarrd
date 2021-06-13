import React, { Component } from 'react';
import AdminHeader from '../AdminContent/AdminHeader';
import Sidebar from '../Sidebar/Sidebar';
import UserContent from './UserContent';

class UserDashboard extends Component {
    render() {
        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Dashboard" toggle="nav-toggle"></AdminHeader>
                <UserContent></UserContent>
            </>
        );
    }
}

export default UserDashboard;