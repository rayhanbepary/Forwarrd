import React, { Component } from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import Footer from '../../components/Footer/Footer';
import Hero from '../../components/Hero/Hero';
import Navigation from '../../components/Navigation/Navigation';
import Topnav from '../../components/Topnav/Topnav';

class Contact extends Component {

    render() {

        document.title = "Contact | Forwarrd"

        return (
            <React.Fragment>
                <Topnav></Topnav>
                <Navigation></Navigation>
                <Hero></Hero>
                <ContactForm></ContactForm>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default Contact;