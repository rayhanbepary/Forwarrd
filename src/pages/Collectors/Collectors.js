import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllCollectorsTable from './AllCollectorsTable';

class Collectors extends Component {
    render() {

        document.title = "All Collectors | Forwarrd"

        return (
            <>
               <Sidebar></Sidebar>
                <AdminHeader title="Collectors" toggle="nav-toggle"></AdminHeader>
                <AllCollectorsTable></AllCollectorsTable> 
            </>
        );
    }
}

export default Collectors;