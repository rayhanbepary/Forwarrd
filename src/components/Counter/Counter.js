import React, { Component } from 'react';
import CountUp from 'react-countup';
import Axios from 'axios';

class Counter extends Component {

    state = {
        counter: []
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

    render() {

        let { counter } = this.state

        return (
            <div className="counter-wrapper section-padding">
                <div className="container">
                    {
                        counter.map(counters => 
                            <div className="row" key={counters._id}>
                                <div className="col-md-4 single-counter-wrapper">
                                    <div className="single-counter">
                                        <CountUp start={0} end={counters.wasteQuantity} delay={0}>
                                            {({ countUpRef }) => (
                                                <div>
                                                    <span ref={countUpRef} />
                                                    <p>Tons of Waste Collected</p>
                                                </div>
                                            )}
                                        </CountUp>
                                    </div>
                                </div>
                                <div className="col-md-4 single-counter-wrapper">
                                    <div className="single-counter">
                                        <CountUp start={0} end={counters.recyclingPercent} delay={0}>
                                            {({ countUpRef }) => (
                                                <div>
                                                    <span ref={countUpRef} />
                                                    <p>Percent of Recycling</p>
                                                </div>
                                            )}
                                        </CountUp>
                                    </div>
                                </div>
                                <div className="col-md-4 single-counter-wrapper">
                                    <div className="single-counter">
                                        <CountUp start={0} end={counters.livesImpact} delay={0}>
                                            {({ countUpRef }) => (
                                                <div>
                                                    <span ref={countUpRef} />
                                                    <p>Lives Impacted</p>
                                                </div>
                                            )}
                                        </CountUp>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        );
    }
}

export default Counter;