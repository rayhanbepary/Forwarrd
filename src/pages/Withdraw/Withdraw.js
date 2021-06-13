import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import WithdrawForm from './WithdrawForm';

class Withdraw extends Component {
    render() {

        document.title = "Withdraw | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Withdraw" toggle="nav-toggle"></AdminHeader>
                <WithdrawForm></WithdrawForm>
            </>
        );
    }
}

export default Withdraw;