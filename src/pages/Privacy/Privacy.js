import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

class Privacy extends Component {
    render() {

        document.title = "Privacy Policy | Forwarrd"

        return (
            <>
                <Navigation></Navigation>
                <div style={{textAlign: 'center', marginTop: "150px", marginBottom: "150px"}}>
                    <h2>Privacy Policy</h2>
                </div>
                <Footer></Footer>
            </>
        );
    }
}

export default Privacy;
