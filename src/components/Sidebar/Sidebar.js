import React, { Component } from 'react';
import Logo from '../../images/logo2.png';
import { Link, withRouter } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUsergroupAdd, AiOutlineAppstoreAdd, AiOutlineUnorderedList, AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RiAdminLine, RiFileList2Line, RiIncreaseDecreaseLine } from 'react-icons/ri';
import { HiOutlineUsers, HiOutlineClipboardList } from 'react-icons/hi';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';

class Sidebar extends Component {
    render() {

        let {user} = this.props.auth;

        return (
            <>
                <input type="checkbox" id="nav-toggle"/>
                <div className={user.role ? "sidebar-wrapper" : "sidebar-wrapper-user"}>
                    <div className="sidebar-brand">
                        <Link to="/">
                            <img src={Logo} alt="Company Logo"/>
                        </Link>
                    </div>
                    <div className="sidebar-menu">
                        <ul>
                            <li>
                                <Link to="/" className="sidebar-link">
                                    <AiOutlineHome className="icon"/>
                                    <span>Home</span>
                                </Link>
                            </li>
                            {   user.isAdmin &&
                                <>
                                    <li>
                                        <Link to="/withdraw-pending" className="sidebar-link">
                                            <HiOutlineClipboardList className="icon"/>
                                            <span>Pending Withdraw</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/withdraw-all" className="sidebar-link">
                                            <RiFileList2Line className="icon"/>
                                            <span>All Withdraw</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/deposit-add" className="sidebar-link">
                                            <AiOutlineAppstoreAdd className="icon"/>                                   
                                            <span>Add Deposit</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/deposit-all" className="sidebar-link">
                                            <AiOutlineUnorderedList className="icon"/>                                
                                            <span>All Deposit</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/counter" className="sidebar-link">
                                            <RiIncreaseDecreaseLine className="icon"/>                                
                                            <span>Counter</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/users" className="sidebar-link">
                                            <AiOutlineUsergroupAdd className="icon"/>
                                            <span>Users</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/collectors" className="sidebar-link">
                                            <HiOutlineUsers className="icon"/>
                                            <span>Collectors</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admins" className="sidebar-link">
                                            <RiAdminLine className="icon"/>
                                            <span>Admins</span>                  
                                        </Link>
                                    </li>
                                </>
                            }
                            {
                                user.isCollector && 
                                <li>
                                    <Link to="/collection-all" className="sidebar-link">
                                        <AiOutlineUnorderedList className="icon"/>                                
                                        <span>All Collection</span>                  
                                    </Link>
                                </li>
                            }
                            {   user.isUser &&
                                <>
                                    <li>
                                        <Link to="/deposit-all-user" className="sidebar-link">
                                            <AiOutlineUnorderedList className="icon"/>                                
                                            <span>All Deposit</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/withdraw-all-user" className="sidebar-link">
                                            <RiFileList2Line className="icon"/>
                                            <span>All Withdraw</span>                  
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/withdraw" className="sidebar-link">
                                            <HiOutlineClipboardList className="icon"/>
                                            <span>Withdraw</span>                  
                                        </Link>
                                    </li>
                                </>
                            }

                            <li>
                                <Link to="/account" className="sidebar-link">
                                    <CgProfile className="icon"/>
                                    <span>Account</span>                  
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="sidebar-link" onClick={() => this.props.logout(this.props.history)}>
                                    <AiOutlineLogout className="icon"/>
                                    <span>Logout</span>                  
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(withRouter(Sidebar));