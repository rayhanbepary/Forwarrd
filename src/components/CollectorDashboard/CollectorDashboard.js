import React, { Component } from 'react';
import AdminHeader from '../AdminContent/AdminHeader';
import Sidebar from '../Sidebar/Sidebar';
import CollectorContent from './CollectorContent';

class CollectorDashboard extends Component {
    render() {
        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Dashboard" toggle="nav-toggle"></AdminHeader>
                <CollectorContent></CollectorContent>
            </>
        );
    }
}

export default CollectorDashboard;