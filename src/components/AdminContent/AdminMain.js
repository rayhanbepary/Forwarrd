import React, { Component } from 'react';
import AdminCard from './AdminCard';
import RecentGrid from './RecentGrid';

class AdminMain extends Component {
    render() {
        return (
            <div className="admin-main">
                <AdminCard></AdminCard>
                <RecentGrid></RecentGrid>
            </div>
        );
    }
}

export default AdminMain;