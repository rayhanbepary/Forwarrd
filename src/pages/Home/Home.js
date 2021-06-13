import React, { Component } from 'react';
import Banner from '../../components/Banner/Banner';
import Counter from '../../components/Counter/Counter';
import Footer from '../../components/Footer/Footer';
import HowWorks from '../../components/HowWorks/HowWorks';
import Manage from '../../components/Manage/Manage';
import Navigation from '../../components/Navigation/Navigation';
import PartnerWithUs from '../../components/PartnerWithUs/PartnerWithUs';
import Services from '../../components/Services/Services';
import Stay from '../../components/Stay/Stay';
import Topnav from '../../components/Topnav/Topnav';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard/Dashboard';

class Home extends Component {

    render() {

        document.title = "Forwarrd"
        let { isAuthenticated } = this.props.auth;

        const homeBanner = {
            title: "What is Lorem Ipsum home ?",
            paragraph: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }

        const manageWaste = {
            title: "manage your waste",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }

        return (
            <>

                {
                    isAuthenticated ? 
                    <Dashboard></Dashboard> :
                    <React.Fragment>
                        <Topnav></Topnav>
                        <Navigation></Navigation>
                        <Banner title={homeBanner.title} paragraph={homeBanner.paragraph}></Banner>
                        <Services></Services>
                        <Manage title={manageWaste.title} description={manageWaste.description}></Manage>
                        <Counter></Counter>
                        <HowWorks></HowWorks>
                        <Stay></Stay>
                        <PartnerWithUs></PartnerWithUs>
                        <Footer></Footer>
                    </React.Fragment>
                }
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps)(Home);