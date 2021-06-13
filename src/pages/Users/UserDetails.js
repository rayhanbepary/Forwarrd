import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { loadAllUsers } from '../../store/actions/authActions';
import Axios from 'axios';
import DetailsWrapper from './DetailsWrapper';
import UserWithdraw from './UserWithdraw';
import CommonDepositTable from '../../components/CommonDepositTable/CommonDepositTable';

class UserDetails extends Component {

    state = {
        user: {},
        client: '',
        offset: 0,
        tableData: [],
        orgTableData: [],
        perPage: 10,
        currentPage: 0,
        orgWithdrawData: [],
        userWithdraw: [],
        WithdrawOffset: 0,
        WithdrawPerPage: 10,
        currentWithdrawPage: 0
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

    handleWithdrawPageClick = (e) => {
        const selectedPage = e.selected;
        const WithdrawOffset = selectedPage * this.state.WithdrawPerPage;

        this.setState({
            currentWithdrawPage: selectedPage,
            WithdrawOffset: WithdrawOffset
        }, () => {
            this.loadMoreWithdrawData()
        });
    };

    loadMoreWithdrawData() {
        const data = this.state.orgWithdrawData;
        
        const slice = data.slice(this.state.WithdrawOffset, this.state.WithdrawOffset + this.state.WithdrawPerPage)
        this.setState({
            perPageCount: Math.ceil(data.length / this.state.WithdrawPerPage),
            userWithdraw:slice
        })

    };

    async componentDidMount() {
        this.props.loadAllUsers();
        const { userId } = this.props.match.params;
        const { allUser } = this.props.auth;
        if (allUser) {
            let user = allUser.find(user => user._id === userId);
            if(!user){
                return null;
            }
            await this.setState({ user: user, client: user.phone });
        }
        this.getUserDeposits();
        this.getUserWithdraws();
    }

    getUserDeposits () { 
        let client = this.state.client;    
        Axios.get(`https://forwarrd.herokuapp.com/api/deposits/${client}/deposits`)
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

    getUserWithdraws () { 
        let client = this.state.client;    
        Axios.get(`https://forwarrd.herokuapp.com/api/withdraws/${client}/withdraws`)
        .then(response => {
            let data = response.data;
            let slice = data.slice(this.state.WithdrawOffset, this.state.WithdrawOffset + this.state.WithdrawPerPage);
            this.setState({
                orgWithdrawData: data,
                userWithdraw: slice,
                perPageCount: Math.ceil(data.length / this.state.perPage)
            })
        })
        .catch(error => {
            console.log(error);
        })
    };


    render() {

        let { user, tableData, userWithdraw } = this.state
        
        document.title = `${user.name} | Forwarrd`

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="User Details" toggle="nav-toggle"></AdminHeader>
                <div className="admin-main">
                    <DetailsWrapper user={user}></DetailsWrapper>
                    <CommonDepositTable 
                        user={user} 
                        deposit={tableData}
                        handlePageClick={this.handlePageClick}
                        pageCount={this.state.pageCount} 
                    ></CommonDepositTable>
                    <UserWithdraw 
                        userWithdraw={userWithdraw}
                        handlePageClick={this.handleWithdrawPageClick}
                        pageCount={this.state.perPageCount}
                    ></UserWithdraw>
                </div>
            </>
            
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadAllUsers })(UserDetails);