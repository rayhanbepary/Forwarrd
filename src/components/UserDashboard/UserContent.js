import React, { Component } from 'react';
import UserCard from './UserCard';
import UserGrid from './UserGrid';

class UserContent extends Component {
    render() {
        return (
            <div className="user-main">
                <div className="user-main-offset"></div>
                <UserCard></UserCard>
                <UserGrid></UserGrid>
                <div className="dashboard-footer" style={{marginTop: "80px"}}>
                    <footer>
                        <p>{new Date().getFullYear()} &copy; Forwarrd.com</p>
                    </footer>
                </div>
            </div>
        );
    }
}

export default UserContent;