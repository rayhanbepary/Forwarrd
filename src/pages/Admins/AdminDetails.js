import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { loadAllAdmins } from '../../store/actions/adminActions';
import Axios from 'axios';
import CommonDepositTable from '../../components/CommonDepositTable/CommonDepositTable';
import CommonDetailsWrapper from '../../components/CommonDetailsWrapper/CommonDetailsWrapper';

class AdminDetails extends Component {

    state = {
        admin: {},
        _id: '',
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

    async componentDidMount() {
        this.props.loadAllAdmins();
        const { adminId } = this.props.match.params;
        const { admins } = this.props.admins;
        if (Array.isArray(admins)) {
            let admin = admins.find(admin => admin._id === adminId);
            if(!admin){
                return null;
            }
            await this.setState({ admin: admin, _id: admin._id });
        }
        this.getAdminCollections();
    }

    getAdminCollections () { 
        let author = this.state._id;    
        Axios.get(`https://forwarrd.herokuapp.com/api/deposits/${author}/collections`)
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


    render() {
  
        let { admin, tableData } = this.state

        document.title = `${admin.name} | Forwarrd`

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Admin Details" toggle="nav-toggle"></AdminHeader>
                <div className="admin-main">
                    <CommonDetailsWrapper collectorOrAdmin={admin}></CommonDetailsWrapper>
                    <CommonDepositTable 
                        pageCount={this.state.pageCount} 
                        user={admin} 
                        deposit={tableData}
                        handlePageClick={this.handlePageClick}
                    >
                    </CommonDepositTable>
                </div>
            </>
            
        );
    }
}

const mapStateToProps = (state) => ({
    admins: state.admins
})

export default connect(mapStateToProps, { loadAllAdmins })(AdminDetails);