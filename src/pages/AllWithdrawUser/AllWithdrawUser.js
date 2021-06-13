import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllWithdrawUserTable from './AllWithdrawUserTable';

class AllWithdrawUser extends Component {
    render() {

        document.title = "All Withdraws | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="All Withdraws" toggle="nav-toggle"></AdminHeader>
                <AllWithdrawUserTable></AllWithdrawUserTable>
            </>
        );
    }
}

export default AllWithdrawUser;