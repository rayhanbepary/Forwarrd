import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class UserWithdraw extends Component {

    formatDate(nowDate) {
        return nowDate.getDate() +"-"+ (nowDate.getMonth() + 1) + '-'+ nowDate.getFullYear();
    }

    render() {
        return (
            <div className="all-withdraw-table">
                <div className="recent-withdraw">
                    <div className="withdraw-card">
                        <div className="recent-card-header">
                            <h4>All Withdraws</h4>
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
                                            <td>Bkash</td>
                                            <td>Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.props.userWithdraw.length > 0 ?
                                                this.props.userWithdraw.map(result => 
                                                    <tr key={result._id}>
                                                        <td data-label="Name">{result.name} <br/>
                                                            <small style={{color: '#8c9090'}}>{this.formatDate(new Date(result.createdAt))}</small>
                                                        </td>
                                                        <td data-label="Organization">{result.orgName}</td>
                                                        <td data-label="Phone">{result.phone}</td>
                                                        <td data-label="Amount">{result.amount} tk</td>
                                                        <td data-label="Bkash">{result.bkash}</td>
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
                        pageCount={this.props.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.props.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} 
                    />

                </div>
            </div>
        );
    }
}

export default UserWithdraw;