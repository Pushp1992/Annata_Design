/** >>>>>>>>>>> HomePage Product Details Section (Main section) <<<<<<<<<<<<< */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'reactstrap';

// Custom Import
import CustomToastr from '../Utils/customToastr';
import CatalougeService from '../Utils/CatalougeService';

Container.propTypes = {
    fluid: PropTypes.bool
}
Row.propTypes = {
    noGutters: PropTypes.bool
}

const defaultState = {
    productId: '',
    imageId: '',
    imageCounts: 0,
    productImageList: []
}

export default class ProductDetails extends Component {

    constructor(props) {
        super(props)

        this.state = defaultState;
    }

    /**
     * Fetch all the product list
     */

    getProductList = () => {
        let productList = CatalougeService.getProductList()
        productList.then((response) => {
            console.log(response)
        }, function (error) {
            CustomToastr.error(error)
        })
    }

    /**
    * Fetch all product image list
    */

    getImageList = () => {
        let imageList = CatalougeService.getImageList()
        imageList.then((response) => {
            CustomToastr.error("my error ewrwe ")
            this.getImageCount();

            const imageCollection = response;
            // imageCollection.forEach(data => {
            //     let image = {
            //         imageUrl: data.url,
            //         imageId: data.id,
            //         productId: data.productId
            //     }
            //     this.setState({ productImageList: image })
            // });
            this.setState({ productImageList: imageCollection })
            console.log(this.state.productImageList)

        }, function (error) {
            CustomToastr.error(error)
        })
    }

    /**
    * Get Image Count
    */

    getImageCount = () => {
        let imageCount = CatalougeService.getImageCount()
        imageCount.then((response) => {
            this.setState({ imageCounts: response.count })
            CustomToastr.success(`All ${this.state.imageCounts} Product Images are Fetched`)
        }, function (error) {
            CustomToastr.error(error)
        })
    }

    componentDidMount() {
        this.getImageList();
    }

    render() {
        return (
            <Container>

                {
                    this.state.productImageList.forEach(image => {
                        return (
                          <div><img src={image.url} /></div>
                        )

                    })
                }

            </Container>
        )
    }
}