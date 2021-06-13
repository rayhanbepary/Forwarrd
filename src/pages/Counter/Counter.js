import React, { Component } from 'react';
import AdminHeader from '../../components/AdminContent/AdminHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import Axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import UpdateCounter from './UpdateCounter';

class Counter extends Component {

    state = {
        counter: [],
        updateModalOpen: false,
        id: '',
    }

    async componentDidMount () {
        await Axios.get('https://forwarrd.herokuapp.com/api/counter/get')
        .then(response => {
            let counter = response.data;
            this.setState({
                counter: counter
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

        let { counter } = this.state

        document.title = 'Counter | Forwarrd'

        return (
            <>
                <Sidebar></Sidebar>
                <AdminHeader title="Counter" toggle="nav-toggle"></AdminHeader>
                <div className="admin-main">
                    <div className="all-withdraw-table">
                        <div className="recent-withdraw">
                            <div className="withdraw-card">
                                <div className="recent-card-header">
                                    <h4>Counter</h4>
                                </div>
                                <div className="recent-card-body">
                                    <div className="table-responsive">
                                        <table width="100%" className="collections-table">
                                            <thead>
                                                <tr>
                                                    <td>Waste Quantity</td>
                                                    <td className="centerText">Percent of Recycling</td>
                                                    <td className="centerText">Lives Impacted</td>
                                                    <td className="centerText">Action</td>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                { counter.length > 0 ?
                                                        counter.map(result => 
                                                            <tr key={result._id}>
                                                                <td data-label="Waste Quantity">{result.wasteQuantity} Tons</td>
                                                                <td data-label="Percent of Recycling" className="centerText">{result.recyclingPercent} %</td>
                                                                <td data-label="Lives Impacted" className="centerText">{result.livesImpact}</td>
                                                                <td data-label="Actions" className="centerText" style={{fontSize: '20px',color: '#008000'}}>
                                                                    {
                                                                        this.state.id === result._id ?
                                                                            <UpdateCounter
                                                                                isOpen={this.state.updateModalOpen}
                                                                                close={this.closeUpdateModal}
                                                                                counter={result}
                                                                            ></UpdateCounter>
                                                                            : null
                                                                    }

                                                                    <span  
                                                                        style={{margin: "0 10px",color: '#008000',cursor: 'pointer'}} 
                                                                        title="Edit User"
                                                                        onClick={() => this.openUpdateModal(result._id)}
                                                                    >
                                                                        <FiEdit/>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ) 
                                                    : <tr><td>No Counter Found</td></tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Counter;