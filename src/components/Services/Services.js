import React, { Component } from 'react';
import AllServices from '../../StaticData/services';
import ServiceCard from './ServiceCard';

class Services extends Component {
    render() {
        return (
            <section className="services-area section-padding" id="services">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 section-header">
                        <h2>what we do</h2>
                        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                    </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {
                            AllServices.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                        } 
                    </div>
                </div>

            </section>
        );
    }
}

export default Services;