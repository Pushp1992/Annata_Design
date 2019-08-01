import React, { Component } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import logo from '../../Asssts/anatta-logo.png';

// Custom Style
import '../Login/login.css';

Container.propTypes = {
    fluid: PropTypes.bool
}
Row.propTypes = {
    noGutters: PropTypes.bool
}

export default class Login extends Component {

    uiConfig = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Card>
                            <CardHeader tag="h5">
                                <span> <img id="logo" src={logo} alt={"logo"} /> </span>
                                <label id="org-name">Anatta E-commerce</label>
                            </CardHeader>
                            <CardBody>
                                <CardTitle>
                                    {/* <h4>SnD Team</h4> */} <br /> <br />
                                </CardTitle>
                                <CardText>
                                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                                        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                                    </Col>
                                </CardText>
                                <br /> <br />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <br />
            </Container>
        )
    }
}