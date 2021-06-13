import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

class Terms extends Component {
    render() {

        document.title = "Terms & Conditions | Forwarrd"

        return (
            <>
                <Navigation></Navigation>
                <div style={{textAlign: 'center', marginTop: "150px", marginBottom: "150px"}}>
                    <h2>Terms & Conditions</h2>
                </div>
                <Footer></Footer>
            </>
        );
    }
}
export default Terms;