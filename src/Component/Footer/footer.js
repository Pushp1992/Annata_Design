/** >>>>>>>>>>> HomePage Footer <<<<<<<<<<<<< */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Container, Row, Col, Table, Button, Input } from 'reactstrap';

// Custom Import
import '../Footer/footer.css';

Container.propTypes = {
    fluid: PropTypes.bool
}
Row.propTypes = {
    noGutters: PropTypes.bool
}

export default class Footer extends Component {

    render() {
        return (
            <Container fluid={true}>
                <Row noGutters={true} className="payment-Style">
                    <Col md={{ size: 3, offset: 1 }}>
                        <i className="fa fa-cc-visa fa-1x" aria-hidden="true"></i> Secure Payment
                    </Col>
                    <Col md={{ size: 3 }}>
                        <i className="fa fa-truck" aria-hidden="true"></i> Express Shipping
                    </Col>
                    <Col md={{ size: 3 }}>
                        <i className="fa fa-exchange" aria-hidden="true"></i> Free Returns
                    </Col>
                </Row>
                <div className="footer-style">
                    <br /> <br />
                    <Row className="footer-header">
                        <Col md={{ size: 2 }}>MEN</Col>
                        <Col md={{ size: 2 }}>WOMEN</Col>
                        <Col md={{ size: 2 }}>SUPPORT</Col>
                        <Col md={{ size: 2 }}>ABOUT</Col>
                        <Col md={{ size: 2 }}>POP UP STORES</Col>
                        <Col md={{ size: 2 }}>NEWSLETTER</Col>
                    </Row>
                    <br />
                    <div className="footer-body">
                        <Row>
                            <Col md={{ size: 2 }}>OCA LOW</Col>
                            <Col md={{ size: 2 }}>OCA LOW</Col>
                            <Col md={{ size: 2 }}>FAQ</Col>
                            <Col md={{ size: 2 }}>Mission</Col>
                            <Col md={{ size: 2 }}>Find Near You</Col>
                            <Col md={{ size: 2 }}>
                                <div>
                                    <Input type="email" name="email" placeholder="Enter email" />
                                    <Button type="submit" outline color="success" value="JOIN US" onclick={this.submit}> JOIN US </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ size: 2 }}>OCA HIGH</Col>
                            <Col md={{ size: 2 }}>OCA HIGH</Col>
                            <Col md={{ size: 2 }}>Returns</Col>
                            <Col md={{ size: 2 }}>Vission</Col>
                            <Col md={{ size: 2 }}>Register</Col>
                        </Row>
                        <Row>
                            <Col md={{ size: 2 }}>CATIBA LOW</Col>
                            <Col md={{ size: 2 }}>CATIBA LOW</Col>
                            <Col md={{ size: 2 }}>Live Chat</Col>
                            <Col md={{ size: 2 }}>Future</Col>
                        </Row>
                        <Row>
                            <Col md={{ size: 2 }}>CATIBA High</Col>
                            <Col md={{ size: 2 }}>CATIBA High</Col>
                            <Col md={{ size: 2 }}></Col>
                            <Col md={{ size: 2 }}></Col>
                            <Col md={{ size: 2 }}>
                                <Input type="search" name="search" placeholder="find your sneakers here" />
                                <Button type="submit" outline color="success" value="search" onclick={this.submit}>
                                    <i className="fa fa-search fa-1x" aria-hidden="true"></i>
                                </Button>
                            </Col>
                            <Col md={{ size: 2 }}>
                                <Row>
                                    <Col md={{ size: 1 }}> <i className="fa fa-facebook fa-1x" aria-hidden="true"></i> </Col>
                                    <Col md={{ size: 1 }}> <i className="fa fa-instagram fa-1x" aria-hidden="true"></i> </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ size: 10, offset: 1 }}>
                                <hr id="horzontal-line" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>
                                    Copyright @ 2019 CARIUMA. ALl Right Reserved. Terms of Use | PrivacyPolicy
                                </div>
                            </Col>
                            <br /> <br />
                        </Row>
                    </div>
                </div>

            </Container>
        )
    }
}