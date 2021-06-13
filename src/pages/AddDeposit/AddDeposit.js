import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import RecentAddedDeposits from './RecentAddedDeposits';

class AddDeposit extends Component {
    render() {

        document.title = "Add Deposit | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Add Deposit" toggle="nav-toggle"></AdminHeader>
                <RecentAddedDeposits></RecentAddedDeposits>
            </>
        );
    }
}

export default AddDeposit;