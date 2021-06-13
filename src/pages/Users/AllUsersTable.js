import React, { Component } from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import UpdateUser from './UpdateUser';
import RemoveUser from './RemoveUser';

class AllUsersTable extends Component {

    state = {
        offset: 0,
        tableData: [],
        orgTableData: [],
        perPage: 10,
        currentPage: 0,
        updateModalOpen: false,
        id: '',
        removeModalOpen: false,
        removeId: '',
        search: ''
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    };

    loadMoreData() {
        const allUsers = this.state.orgTableData;
        
        const slice = allUsers.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(allUsers.length / this.state.perPage),
            tableData:slice
        })

    };

    componentDidMount () {
        this.getAllUsers();
    };


    getAllUsers () {
        Axios.get('https://forwarrd.herokuapp.com/api/users/all/users')
        .then(response => {
            let allUsers = response.data;
            let slice = allUsers.slice(this.state.offset, this.state.offset + this.state.perPage);

            this.setState({
                orgTableData: allUsers,
                tableData: slice,
                pageCount: Math.ceil(allUsers.length / this.state.perPage)
            })
        })
        .catch(error => {
            console.log(error);
        })
    };


    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }

    openRemoveModal = (removeId) => {
        this.setState({
            removeModalOpen: true,
            removeId
        })
    }

    closeRemoveModal = () => {
        this.setState({
            removeModalOpen: false,
            removeId: ''
        })
    }

    formatDate(nowDate) {
        return nowDate.getDate() +"-"+ (nowDate.getMonth() + 1) + '-'+ nowDate.getFullYear();
    }

    handleSearch = e =>{
        this.setState({ search : e.target.value });
    }

    render() {

        const {search, tableData} = this.state;
        const filteredData = tableData.filter( data =>{
            return data.phone.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })

        return (
            <div className="admin-main">
                <div className="all-withdraw-table">
                    <div className="recent-withdraw">
                        

                        <div className="withdraw-card">
                            <div className="recent-card-header">
                                <h4>All Users</h4>
                                <div className="search">
                                    <input 
                                        placeholder="Search User" 
                                        type="search" 
                                        onChange={this.handleSearch}
                                    />
                                </div>
                            </div>
                            <div className="recent-card-body">
                                <div className="table-responsive">
                                     <table width="100%" className="collections-table">
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Organization</td>
                                                <td>Phone</td>
                                                <td>Email</td>
                                                <td>Address</td>
                                                <td>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { filteredData.length > 0 ?
                                                    filteredData.map(result => 
                                                        <tr key={result._id}>
                                                            <td data-label="Name">{result.name} <br/>
                                                                <small style={{color: '#8c9090'}}>{this.formatDate(new Date(result.createdAt))}</small>
                                                            </td>
                                                            <td data-label="Organization">{result.orgName}</td>
                                                            <td data-label="Phone">{result.phone}</td>
                                                            <td data-label="Email">{result.email}</td>
                                                            <td data-label="Address">{result.address}</td>
                                                            <td data-label="Actions" style={{fontSize: '20px',color: '#008000'}}>
                                                                <Link to={`/user-details/${result._id}`} style={{color: '#008000'}} title="View details"><FiExternalLink/></Link>

                                                                {
                                                                    this.state.id === result._id ?
                                                                        <UpdateUser
                                                                            isOpen={this.state.updateModalOpen}
                                                                            close={this.closeUpdateModal}
                                                                            user={result}
                                                                        ></UpdateUser>
                                                                        : null
                                                                }

                                                                <span  
                                                                    style={{margin: "0 10px",color: '#008000',cursor: 'pointer'}} 
                                                                    title="Edit User"
                                                                    onClick={() => this.openUpdateModal(result._id)}
                                                                >
                                                                    <FiEdit/>
                                                                </span>

                                                                {
                                                                    this.state.removeId === result._id ?
                                                                        <RemoveUser
                                                                            isOpen={this.state.removeModalOpen}
                                                                            close={this.closeRemoveModal}
                                                                            user={result}
                                                                        ></RemoveUser>
                                                                        : null
                                                                }
                                                                <span 
                                                                    style={{cursor: 'pointer'}} title="Remove User"
                                                                    onClick={() => this.openRemoveModal(result._id)}
                                                                >
                                                                    <AiOutlineDelete/>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ) 
                                                : <tr><td>No User Found</td></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <ReactPaginate
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(AllUsersTable);