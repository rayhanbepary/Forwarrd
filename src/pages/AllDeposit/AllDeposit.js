import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllDepositTable from './AllDepositTable';


class AllDeposit extends Component {
    render() {

        document.title = "All Deposits | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Deposits" toggle="nav-toggle"></AdminHeader>
                <AllDepositTable></AllDepositTable>
            </>
        );
    }
}

export default AllDeposit;