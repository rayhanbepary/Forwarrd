import React, { Component } from 'react';
import AdminHeader from '../AdminContent/AdminHeader';
import Sidebar from '../Sidebar/Sidebar';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import UpdateDeposit from '../../pages/AddDeposit/UpdateDeposit';

class AllCollections extends Component {


    state = {
        offset: 0,
        tableData: [],
        orgTableData: [],
        perPage: 10,
        currentPage: 0,
        updateModalOpen: false,
        id: ''
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
        this.getAllCollections();
    };


    getAllCollections () {
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

    render() {

        document.title = "All Collections | Forwarrd"

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Collections" toggle="nav-toggle"></AdminHeader>
                
                <div className="user-main">
                    <div className="all-withdraw-table" style={{marginTop: "120px", padding: "30px 20px"}}>
                        <div className="recent-withdraw collections">
                            <div className="withdraw-card">
                                <div className="recent-card-header">
                                    <h4>All Collections</h4>
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

                                            { this.state.tableData.length > 0 ?
                                                    this.state.tableData.map(result => 
                                                        <tr key={result._id}>
                                                            <td data-label="Name">{result.name}</td>
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
                        <div className="dashboard-footer">
                            <footer>
                                <p>{new Date().getFullYear()} &copy; Forwarrd.com</p>
                            </footer>
                        </div>
                </div>
            </>
        );
    }
}

export default AllCollections;