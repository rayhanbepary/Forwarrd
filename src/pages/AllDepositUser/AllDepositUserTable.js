import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';

class AllDepositUserTable extends Component {

    state = {
        offset: 0,
        tableData: [],
        orgTableData: [],
        perPage: 10,
        currentPage: 0
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
        this.getAllDeposit();
    };

    getAllDeposit () {
        Axios.get('https://forwarrd.herokuapp.com/api/deposits/diff/user/allDeposits')
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

    render() {
        return (
            <div className="user-main">
                <div className="user-grid deposit-user-table">
                    <div className="user-deposit">
                        <div className="user-grid-card">
                            <div className="recent-card-header">
                                <h4>All Deposits</h4>
                            </div>
                            <div className="recent-card-body">
                                <div className="table-responsive">
                                    <table width="100%">
                                        <thead>
                                            <tr>
                                                <td>Quantity</td>
                                                <td className="text-center">Amount</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.tableData.length > 0 ?
                                                    this.state.tableData.map(result => 
                                                        <tr key={result._id}>
                                                            <td>{result.quantity} kg <br/>
                                                                <small style={{color: '#8c9090'}}>{this.formatDate(new Date(result.createdAt))}</small>
                                                            </td>
                                                            <td className="text-center">{result.amount} tk</td>
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
                <div className="dashboard-footer">
                    <footer>
                        <p>{new Date().getFullYear()} &copy; Forwarrd.com</p>
                    </footer>
                </div>
            </div>
        );
    }
}

export default AllDepositUserTable;