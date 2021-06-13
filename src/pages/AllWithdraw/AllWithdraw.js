import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllWithdrawTable from './AllWithdrawTable';


class AllWithdraw extends Component {
    render() {

        document.title = "All Withdraws | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Withdraws" toggle="nav-toggle"></AdminHeader>
                <AllWithdrawTable></AllWithdrawTable>
            </>
        );
    }
}

export default AllWithdraw;