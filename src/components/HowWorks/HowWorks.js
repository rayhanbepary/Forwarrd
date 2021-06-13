import React, { Component } from 'react';
import SequentOfWork from '../../StaticData/howWorksData';
import HowWorksCard from './HowWorksCard';

class HowWorks extends Component {
    render() {
        return (
            <section className="howWorks-wrapper section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 section-header">
                            <h2>HOW IT WORKS... IT'S AS SIMPLE AS 1, 2, 3</h2>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {
                            SequentOfWork.map(sequent => <HowWorksCard key={sequent._id} sequent={sequent}></HowWorksCard>)
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default HowWorks;