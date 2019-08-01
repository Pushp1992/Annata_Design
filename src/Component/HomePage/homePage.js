/** >>>>>>>>>>> HomePage <<<<<<<<<<<<< */

import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';

// Custom style
import '../HomePage/homePage.css';
// Custom Import
import Header from '../Header/header';
import Footer from '../Footer/footer';
import ProductDetails from '../ProductDetails/productDetails';

export default class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />

                <br/><br/><br/><br/>

                <ProductDetails />

                <h3> This is Homepage of the application</h3>

                <br/><br/><br/><br/>


                <Footer />
            </React.Fragment>
        )
    }
}