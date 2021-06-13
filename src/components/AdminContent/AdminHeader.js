import React, { Component } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { connect } from 'react-redux';

class AdminHeader extends Component {
    render() {

        let { user } = this.props.auth;

        return (
            <div className="admin-header">
                <header>
                    <h4>
                        <label htmlFor={this.props.toggle}>
                            <AiOutlineMenu className="menu-icon" style={{marginRight: "15px"}}/>
                        </label>
                        <span>{this.props.title}</span>
                    </h4>
                    <div className="user-wrapper">
                        <h4>{user.name}</h4>
                        {
                            user.role ? 
                            <small>{user.role}</small> :
                            <small>Super User</small>
                        }
                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AdminHeader);