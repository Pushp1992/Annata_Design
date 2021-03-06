/** >>>>>>>>>>> Homepage Header <<<<<<<<<<<<< */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col, Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';

// Custom import
import '../Header/header.css';
import CustomToastr from '../Utils/customToastr';
import logo from '../../Asssts/anatta-logo.png';

Container.propTypes = {
    fluid: PropTypes.bool
}
Row.propTypes = {
    noGutters: PropTypes.bool
}

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false
        }

        this.toggle = this.toggle.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }

    signOut(event) {
        event.preventDefault();

        firebase.auth().signOut()
            .then(function () {
                CustomToastr.success("Logout Successful !");
                window.location.reload()
                // this.props.history.push('/signin');
            }).catch(function (error) {
                CustomToastr.error(error || "Error occured while logging off. Please try again !");
            });
    }

    render() {

        const user = {
            name: firebase.auth().currentUser.name,
            photo: firebase.auth().currentUser.photoURL,
            email: firebase.auth().currentUser.email
        }
        return (
            <Router>
                <Container fluid={true}>
                    <Row style={{ backgroundColor: 'black', color: 'white' }}>
                        <Col md={{ size: 5, offset: 4 }}>
                            <label>FREE US SHIPPING &amp; RETURN</label>
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: 'whitesmoke', color: "black" }}>
                        <Col md={{ size: 1 }} className="header-item">MEN</Col>
                        <Col md={{ size: 1 }} className="header-item" style={{border: "solid 2px white"}}>WOMEN</Col>
                        <Col md={{ size: 7 }} className="header-item">
                            <label className="align-circle">
                                <i id="red-circle" class="fa fa-circle-thin fa-3x" aria-hidden="true"></i>
                                <i id="green-circle" class="fa fa-circle-thin fa-3x" aria-hidden="true"></i>
                            </label>
                        </Col>
                        <Col md={{ size: 1 }} className="header-item">
                            ABOUT
                        </Col>
                        <Col md={{ size: 1 }} className="header-item">
                            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                        </Col>
                        <Col md={{ size: 1 }}>
                            <div style={{ textAlign: 'right' }}>
                                <Button outline color="primary" id="ProfilePopover" onClick={this.toggle}>
                                    <img src={user.photo} alt={user.photo} className="coverImage" />
                                    &nbsp; <strong id="userName">{user.name}</strong>
                                </Button>
                                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="ProfilePopover" toggle={this.toggle}>
                                    <PopoverBody>
                                        <Row noGutters={true}>
                                            <Col md={{ size: 5 }}><img src={user.photo} alt="profile_image" id="userImage" /></Col>
                                            <Col md={{ size: 6, offset: 1 }}>
                                                <div><strong>{user.name}</strong></div>
                                                <div><span id="userEmail">{user.email}</span></div>
                                            </Col>
                                        </Row>
                                    </PopoverBody>
                                    <PopoverHeader>
                                        <Row>
                                            <Col md={{ size: 4, offset: 7 }}>
                                                <Button color="link" onClick={this.signOut}>Logout</Button>
                                            </Col>
                                        </Row>
                                    </PopoverHeader>
                                </Popover>
                            </div>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col md={{ size: 12 }}>
                            <hr id="horzontal-line" />
                        </Col>
                    </Row> */}
                </Container>
            </Router>
        )
    }
}