import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { loadAllCollectors } from '../../store/actions/collectorActions';
import Axios from 'axios';
import CommonDepositTable from '../../components/CommonDepositTable/CommonDepositTable';
import CommonDetailsWrapper from '../../components/CommonDetailsWrapper/CommonDetailsWrapper';

class CollectorDetails extends Component {

    state = {
        collector: {},
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
        this.props.loadAllCollectors();
        const { collectorId } = this.props.match.params;
        const { collectors } = this.props.collectors;
        if (Array.isArray(collectors)) {
            let collector = collectors.find(collector => collector._id === collectorId);
            if(!collector){
                return null;
            }
            await this.setState({ collector: collector, _id: collector._id });
        }
        this.getCollectorCollections();
    }

    getCollectorCollections () { 
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
  
        let { collector, tableData } = this.state

        document.title = `${collector.name} | Forwarrd`

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Collector" toggle="nav-toggle"></AdminHeader>
                <div className="admin-main">
                    <CommonDetailsWrapper collectorOrAdmin={collector}></CommonDetailsWrapper>
                    <CommonDepositTable 
                        pageCount={this.state.pageCount} 
                        user={collector} 
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
    collectors: state.collectors
})

export default connect(mapStateToProps, { loadAllCollectors })(CollectorDetails);