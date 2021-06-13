import React, { Component } from 'react';
import { AiOutlineMobile, AiOutlineMail } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class ContactForm extends Component {

    state = {
        name: '', 
        email: '', 
        phone: '', 
        address: '', 
        message: ''
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let { name, email, phone, address, message } = this.state
        let templateParams = {
            from_name: name,
            to_name: 'Forwarrd Customer Care',
            email: email,
            phone: phone,
            address: address,
            message: message
        }
        emailjs.send(
            'service_id',
            'template_id',
            templateParams,
            'user_id'
        )
        .then(response => {
            if (response) {
                this.notify()
            }
         }, (err) => {
            if (err) {
                let customId = "contactError";
                toast.error("Failed to send your message ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    toastId: customId
                })
            }
         });
         this.setState({
            name: '', 
            email: '', 
            phone: '', 
            address: '', 
            message: ''
        })
    }

    notify = () => {
        let customId = "contactSuccess";
        toast.success("Your message has been sent successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: customId
        })
    };


    render() {

        let { name, email, phone, address, message } = this.state

        return (
            <div className="contact-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 form-wrapper">
                            <h2>Get in touch</h2>
                            <ToastContainer />
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

                            <form onSubmit={this.submitHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="name" 
                                                className="from-box" 
                                                placeholder="Name"
                                                onChange={this.changeHandler}
                                                value={name}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="email"
                                                name="email" 
                                                className="from-box" 
                                                placeholder="Email"
                                                onChange={this.changeHandler}
                                                value={email}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="address" 
                                                className="from-box" 
                                                placeholder="Address"
                                                onChange={this.changeHandler}
                                                value={address}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                name="phone" 
                                                className="from-box" 
                                                placeholder="Phone"
                                                onChange={this.changeHandler}
                                                value={phone}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="from-box" 
                                        name="message" 
                                        rows="7" 
                                        placeholder="Your Message..."
                                        onChange={this.changeHandler}
                                        value={message}
                                        required
                                    ></textarea>
                                </div>
                                <input type="submit" value="Send Message"/>
                            </form>
                        </div>
                        <div className="col-md-6 address-wrapper">
                        <div className="address-container">
                                <div className="icon">
                                    <AiOutlineMail className="email-icon"/>
                                </div>
                                <div className="text">
                                    <h6>Email:</h6>
                                    <p>info.forwarrd@gmail.com</p>
                                </div>
                            </div>
                            <div className="address-container">
                                <div className="icon">
                                    <AiOutlineMobile className="mobile-icon"/>
                                </div>
                                <div className="text">
                                    <h6>Phone:</h6>
                                    <p>01732463274</p>
                                </div>
                            </div>
                            <div className="address-container">
                                <div className="icon">
                                    <GoLocation className="location-icon"/>
                                </div>
                                <div className="text">
                                    <h6>Address:</h6>
                                    <p>Dhaka-1000, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactForm;
