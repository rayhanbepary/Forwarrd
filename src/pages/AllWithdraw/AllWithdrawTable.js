import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';

class AllWithdrawTable extends Component {


    state = {
        offset: 0,
        tableData: [],
        orgTableData: [],
        perPage: 10,
        currentPage: 0,
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
        const data = this.state.orgTableData;
        
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData:slice
        })

    };

    componentDidMount () {
        this.getAllWithdraw();
    };

    getAllWithdraw () {
        Axios.get('https://forwarrd.herokuapp.com/api/withdraws/admin/allWithdraw')
        .then(response => {
            let data = response.data;
            let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);

            this.setState({
                orgTableData: data,
                tableData: slice,
                pageCount: Math.ceil(data.length / this.state.perPage)
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

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
                                <h4>All Withdraws</h4>
                                <div className="search">
                                    <input 
                                        placeholder="Search Withdraw" 
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
                                                <td>Bkash</td>
                                                <td>Amount</td>
                                                <td>Status</td>
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
                                                            <td data-label="Bkash">{result.bkash}</td>
                                                            <td data-label="Amount">{result.amount}</td>
                                                            <td data-label="Status">{result.status}</td>
                                                        </tr>
                                                    ) 
                                                : <tr><td>No Withdraw Found</td></tr>
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

export default AllWithdrawTable;