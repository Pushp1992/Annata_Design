/** >>>>>>>>>>> HomePage Product Details Section (Main section) <<<<<<<<<<<<< */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Card, CardHeader, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Select, { Option } from 'rc-select';
import ImageGallery from 'react-image-gallery';

// Custom Import
import CustomToastr from '../Utils/customToastr';
import CatalougeService from '../Utils/CatalougeService';

// Custom Style
import '../ProductDetails/productDetails.css';

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
    productImages: [],
    productName: "Select your product",
    productList: []
}

export default class ProductDetails extends Component {

    constructor(props) {
        super(props)

        this.state = defaultState;
        this.showAlert = this.showAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    showAlert(event) {
        event.preventDefault()

        window.alert("alert");
    }

    /**
     * Select product
     */

    handleChange(e, name) {
        let productID;
        let selectedProduct;
        if (e && e.target) {
            productID = e.target.value;
            selectedProduct = name.props.text

        } else {
            productID = e;
            selectedProduct = name.props.text
        }
        this.setState({ productName: selectedProduct })
        this.productImageList(productID);
    }

    /**
     * Fetch all the products
     */

    getProductList = () => {
        let productResponse = CatalougeService.getProductList()
        productResponse.then((response) => {
            let productData = response;
            this.setState({ productList: productData })
            console.log("productList", this.state.productList)
        }, function (error) {
            CustomToastr.error(error)
        })
    }

    /**
    * Fetch all product image
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
            CustomToastr.error("Unable to fetch Image List" || error)
        })
    }

    /**
     *  Fetch Product Image by productId
     */

    productImageList(data) {
        let imageListresponse = CatalougeService.getProductImageList(data);
        imageListresponse.then(response => {
            let newProductImage = response.map(data => {
                var result = Object.assign({}, data)
                result.original = data.url;
                result.thumbnail = data.url;
                return result;
            })
            this.setState({ productImages: newProductImage })
            console.log("new product image", this.state.productImages)
        }, function (error) {
            CustomToastr.error("Unable to fetch Product Images" || error)
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
        this.getProductList();
        // this.getImageList();
    }

    render() {

        const images = this.state.productImages;

        return (
            <Container fluid={true}>
                <Row>
                    <Col md={{ size: 2 }}>
                        <Select name="productName" id="productItem" bsSize="sm" value={this.state.productName} onChange={this.handleChange} dropdownMenuStyle={{ maxHeight: 500 }} optionLabelProp="children" optionFilterProp="text" backfill required>
                            {
                                this.state.productList.map(function (product, key) {
                                    return (
                                        <Option key={key} text={product.name} value={product.id}>
                                          
                                               {product.name} - {product.id}
                                           
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Col>
                    <Col md={{ size: 3 }}>
                        <div>
                            <h4> product details will appear here </h4>
                        </div>
                    </Col>
                    <Col md={{ size: 4 }}>
                        <ImageGallery items={images} onThumbnailClick={this.showAlert} />
                    </Col>
                </Row>
                {/* {
                    this.state.productImageList.map(data => {
                        return (
                            data.id
                        )
                    })
                } */}


            </Container>
        )
    }
}