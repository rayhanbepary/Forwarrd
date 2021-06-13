import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllUsersTable from './AllUsersTable';

class Users extends Component {
    render() {

        document.title = "All Users | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Users" toggle="nav-toggle"></AdminHeader>
                <AllUsersTable></AllUsersTable>
            </>
        );
    }
}

export default Users;