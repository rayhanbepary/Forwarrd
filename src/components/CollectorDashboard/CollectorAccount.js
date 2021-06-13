import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import CommonDepositTable from '../CommonDepositTable/CommonDepositTable';
import CommonDetailsWrapper from '../CommonDetailsWrapper/CommonDetailsWrapper';
import ChangePassword from '../../pages/Account/ChangePassword';
import UpdateCollectorAccount from './UpdateCollectorAccount';

class CollectorAccount extends Component {


    state = {
        offset: 0,
        tableData: [],
        orgTableData: [],
        perPage: 10,
        currentPage: 0,
        updateModalOpen: false,
        ChangePasswordModalOpen: false
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

    async componentDidMount() {
        this.getAdminCollections();
    }

    getAdminCollections () {    
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

    openUpdateModal = () => {
        this.setState({
            updateModalOpen: true
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false
        })
    }

    openChangePasswordModal = () => {
        this.setState({
            ChangePasswordModalOpen: true
        })
    }

    closeChangePasswordModal = () => {
        this.setState({
            ChangePasswordModalOpen: false
        })
    }


    render() {

        let { tableData } = this.state;
        let { user } = this.props.auth;

        return (
            <div className="admin-main">
                <div className="mb-5">
                    <button className="btn btn-success mr-4 mb-3" onClick={this.openUpdateModal}>Update Profile</button>
                        <UpdateCollectorAccount
                            isOpen={this.state.updateModalOpen}
                            close={this.closeUpdateModal}
                            collector={user}
                        ></UpdateCollectorAccount>
                    <button className="btn btn-warning mb-3" onClick={this.openChangePasswordModal}>Change Password</button>
                    <ChangePassword
                        isOpen={this.state.ChangePasswordModalOpen}
                        close={this.closeChangePasswordModal}
                    ></ChangePassword>
                </div>
                
                <CommonDetailsWrapper collectorOrAdmin={user}></CommonDetailsWrapper>
                <CommonDepositTable 
                    pageCount={this.state.pageCount} 
                    user={user} 
                    deposit={tableData}
                    handlePageClick={this.handlePageClick}
                >
                </CommonDepositTable>

                <div className="dashboard-footer" style={{marginTop: "80px"}}>
                    <footer>
                        <p>{new Date().getFullYear()} &copy; Forwarrd.com</p>
                    </footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(CollectorAccount);