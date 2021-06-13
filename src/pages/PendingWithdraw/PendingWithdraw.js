import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import PendingWithdrawTable from './PendingWithdrawTable';


class PendingWithdraw extends Component {
    render() {

        document.title = "Pending Withdraws | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Withdraws" toggle="nav-toggle"></AdminHeader>
                <PendingWithdrawTable></PendingWithdrawTable>
            </>
        );
    }
}

export default PendingWithdraw;