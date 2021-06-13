import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllAdminsTable from './AllAdminsTable';

class Admins extends Component {
    render() {

        document.title = "All Admins | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Admins" toggle="nav-toggle"></AdminHeader>
                <AllAdminsTable></AllAdminsTable>
            </>
        );
    }
}

export default Admins;