import React, { Component } from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import CreateAdmin from './CreateAdmin';
import RemoveAdmin from './RemoveAdmin';

class AllAdminsTable extends Component {

    state = {
        offset: 0,
        tableData: [],
        orgTableData: [],
        perPage: 10,
        currentPage: 0,
        createModalOpen: false,
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
        const allAdmins = this.state.orgTableData;
        
        const slice = allAdmins.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(allAdmins.length / this.state.perPage),
            tableData:slice
        })

    };

    componentDidMount () {
        this.getAllAdmins();
    };


    getAllAdmins () {
        Axios.get('https://forwarrd.herokuapp.com/api/admins/all/admins')
        .then(response => {
            let allAdmins = response.data;
            let slice = allAdmins.slice(this.state.offset, this.state.offset + this.state.perPage);

            this.setState({
                orgTableData: allAdmins,
                tableData: slice,
                pageCount: Math.ceil(allAdmins.length / this.state.perPage)
            })
        })
        .catch(error => {
            console.log(error);
        })
    };


    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
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
                <button className="add-deposit" onClick={this.openCreateModal}>Add new admin</button>
                <CreateAdmin
                    isOpen={this.state.createModalOpen}
                    close={this.closeCreateModal}
                >
                </CreateAdmin>
                <div className="all-withdraw-table">
                    <div className="recent-withdraw">
                        <div className="withdraw-card">
                            <div className="recent-card-header">
                                <h4>All Admins</h4>
                                <div className="search">
                                    <input 
                                        placeholder="Search Admin" 
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
                                                            <td data-label="Name">{result.name}</td>
                                                            <td data-label="Phone">{result.phone}</td>
                                                            <td data-label="Email">{result.email}</td>
                                                            <td data-label="Address">{result.address}</td>
                                                            <td data-label="Actions" style={{fontSize: '20px',color: '#008000'}}>
                                                                <Link to={`/admin-details/${result._id}`} style={{color: '#008000'}} title="View details"><FiExternalLink/></Link>

                                                                {
                                                                    this.state.removeId === result._id ?
                                                                        <RemoveAdmin
                                                                            isOpen={this.state.removeModalOpen}
                                                                            close={this.closeRemoveModal}
                                                                            admin={result}
                                                                        ></RemoveAdmin>
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
                                                : <tr><td>No Admin Found</td></tr>
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

export default connect(null)(AllAdminsTable);