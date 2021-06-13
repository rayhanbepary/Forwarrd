import React, { Component } from 'react';
import Banner from '../../components/Banner/Banner';
import Counter from '../../components/Counter/Counter';
import Footer from '../../components/Footer/Footer';
import Manage from '../../components/Manage/Manage';
import Navigation from '../../components/Navigation/Navigation';
import PartnerWithUs from '../../components/PartnerWithUs/PartnerWithUs';
import Topnav from '../../components/Topnav/Topnav';
import Vision from '../../components/Vision/Vision';

class About extends Component {

    render() {

        document.title = "About Us | Forwarrd"

        const aboutBanner = {
            title: "What is Lorem Ipsum about ?",
            paragraph: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }

        const about = {
            title: "about forwarrd",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }

        return (
            <React.Fragment>
                <Topnav></Topnav>
                <Navigation></Navigation>
                <Banner title={aboutBanner.title} paragraph={aboutBanner.paragraph}></Banner>
                <Manage title={about.title} description={about.description}></Manage>
                <Vision></Vision>
                <Counter></Counter>
                <PartnerWithUs></PartnerWithUs>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default About;