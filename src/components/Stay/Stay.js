import React, { Component } from 'react';
import StayData from '../../StaticData/StayData';
import StayCard from './StayCard';

class Stay extends Component {
    render() {
        return (
            <section className="stay-area section-padding" id="stay">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 section-header">
                        <h2>why stay with us</h2>
                    </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {
                            StayData.map(stay => <StayCard key={stay._id} stay={stay}></StayCard>)
                        } 
                    </div>
                </div>

            </section>
        );
    }
}

export default Stay;