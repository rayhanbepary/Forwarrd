import React, { Component } from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import CreateDeposit from './CreateDeposit';
import UpdateDeposit from './UpdateDeposit';

class RecentAddedDeposits extends Component {


    state = {
        offset: 0,
        tableData: [],
        orgTableData: [],
        perPage: 10,
        currentPage: 0,
        createModalOpen: false,
        updateModalOpen: false,
        id: '',
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
        const deposits = this.state.orgTableData;
        
        const slice = deposits.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(deposits.length / this.state.perPage),
            tableData:slice
        })

    };

    componentDidMount () {
        this.getRecentAddedDeposits();
    };


    getRecentAddedDeposits () {
        Axios.get('https://forwarrd.herokuapp.com/api/deposits/diff/user/allDeposits')
        .then(response => {
            let allDeposits = response.data;
            let slice = allDeposits.slice(this.state.offset, this.state.offset + this.state.perPage);

            this.setState({
                orgTableData: allDeposits,
                tableData: slice,
                pageCount: Math.ceil(allDeposits.length / this.state.perPage)
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

    formatDate(nowDate) {
        return nowDate.getDate() +"-"+ (nowDate.getMonth() + 1) + '-'+ nowDate.getFullYear();
    }

    handleSearch = e =>{
        this.setState({ search : e.target.value });
    }

    render() {

        const {search, tableData} = this.state;
        const filteredData = tableData.filter( data =>{
            return data.client.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })

        return (
            <div className="admin-main">
                <button className="add-deposit" onClick={this.openCreateModal}>Add new deposit</button>
                <CreateDeposit
                    isOpen={this.state.createModalOpen}
                    close={this.closeCreateModal}
                >
                </CreateDeposit>



                <div className="all-withdraw-table">
                    <div className="recent-withdraw">
                        <div className="withdraw-card">
                            <div className="recent-card-header">
                                <h4>Recent Added Deposits</h4>
                                <div className="search">
                                    <input 
                                        placeholder="Search Deposit" 
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
                                                <td>Amount</td>
                                                <td>Quantity</td>
                                                <td>Type</td>
                                                <td>Action</td>
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
                                                            <td data-label="Phone">{result.client}</td>
                                                            <td data-label="Amount">{result.amount} tk</td>
                                                            <td data-label="Quantity">{result.quantity} kg</td>
                                                            <td data-label="Type">{result.type}</td>
                                                            <td data-label="Action">
                                                                {
                                                                    this.state.id === result._id ?
                                                                        <UpdateDeposit
                                                                            isOpen={this.state.updateModalOpen}
                                                                            close={this.closeUpdateModal}
                                                                            deposit={result}
                                                                        ></UpdateDeposit>
                                                                        : null
                                                                }
                                                                <button 
                                                                className="btn btn-success"
                                                                onClick={() => this.openUpdateModal(result._id)}
                                                                >Update</button>
                                                            </td>
                                                        </tr>
                                                    ) 
                                                : <tr><td>No Deposit Found</td></tr>
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

export default RecentAddedDeposits;