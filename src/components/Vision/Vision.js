import React, { Component } from 'react';
import visionImg from '../../images/vision.jpg';

class Vision extends Component {
    render() {
        return (
            <div className='vision-wrapper section-padding'>
                <div className="container">
                    <div className="row">
                    <div className="col-md-6">
                            <div className="manage-or-about-content">
                                <h2 className="vision">OUR VISION</h2>
                                    <ul>
                                        <li>
                                            At FORWARRD, enough is never enough.
                                        </li>
                                        <li>
                                            To build a safer, cleaner, more prosperous world by ensuring no waste is ever wasted.
                                        </li>
                                        <li>
                                            Becoming waste free won't be easy,but it the single most important thing we have to do,to ensure no resource is wasted.
                                        </li>
                                        <li>
                                            To help a wide range of federal, municipal and commercial clients recover, recycle and re-imagine the byproducts of our daily lives through innovative waste and energy solutions.
                                        </li>
                                        <li>
                                            Our people are a rare breed, pushing each other onwards to do more and do better.They have driven us forward, kept us fresh. They are Go-getters!
                                        </li>
                                        <li>
                                            At FORWARRD, when we fail, we adapt. When we improve, we push each other to the next level. We don't say what others want to hear. we do what we have to do to get the job done.
                                        </li>
                                        <li>
                                            FORWARRD, pushing for a waste free Bangladesh.
                                        </li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={visionImg} alt="" width="90%" height="auto"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vision;