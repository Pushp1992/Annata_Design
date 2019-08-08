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

                <br/><br/>

                <ProductDetails />


                <br/><br/><br/><br/>


                <Footer />
            </React.Fragment>
        )
    }
}