import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllDepositUserTable from './AllDepositUserTable';

class AllDepositUser extends Component {
    render() {

        document.title = "All Deposits | Forwarrd"
        
        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="All Deposits" toggle="nav-toggle"></AdminHeader>
                <AllDepositUserTable></AllDepositUserTable>
            </>
        );
    }
}

export default AllDepositUser;