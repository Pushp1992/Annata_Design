/** >>>>>>>>>>> HomePage Product Details Section (Main section) <<<<<<<<<<<<< */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Card, CardHeader, CardFooter, CardBody, Jumbotron, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import Select, { Option } from 'rc-select';
import ImageGallery from 'react-image-gallery';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';

// Custom Import
import CustomToastr from '../Utils/customToastr';
import CatalougeService from '../Utils/CatalougeService';
import DemoImageCarousel from '../Utils/demoImageCarousel';
import { ColorRadioButton, SizeRadioButton } from '../Utils/radioButtonGroup';

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
    productList: [],
    productDescription: {},
    allImageList: [],
    loader: false
}

export default class ProductDetails extends Component {

    constructor(props) {
        super(props)

        this.state = defaultState;
        this.handleChange = this.handleChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    /**
     * Add product to cart
     */
    addToCart(event) {
        event.preventDefault();
        CustomToastr.warning("Currently we are not using this service!")
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
        this.getProductInformation(productID);
    }

    /**
     * Fetch all the products
     */

    getProductList = () => {
        var self = this;
        self.setState({ loader: true })
        let productResponse = CatalougeService.getProductList()
        productResponse.then((response) => {
            let productData = response;
            self.setState({ loader: false })
            self.setState({ productList: productData })
        }, function (error) {
            self.setState({ loader: false })
            CustomToastr.error(error);
        })
    }

    /**
    * Fetch Product Description by productId
    */

    getProductInformation = (productId) => {
        let productResponse = CatalougeService.getProductInformation(productId)
        productResponse.then((response) => {
            let productInfo = response;
            this.setState({ productDescription: productInfo })
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
            this.getImageCount();
            const imageCollection = response;
            this.setState({ allImageList: imageCollection })
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
        this.getImageList();
    }

    render() {

        const images = this.state.productImages;
        const demoImage = DemoImageCarousel;
        const productDesc = this.state.productDescription;
        const loaderValue = this.state.loader;
        const itemLoader = "Loading Items";

        return (
            <Container fluid={true}>
                <Row noGutters={true}>
                    <Col md={{ size: 6 }}>
                        <Row noGutters={true}>
                            <Col md={{ size: 4 }}>
                                <Select name="productName" id="productItem" bsSize="sm" value={this.state.productName} onChange={this.handleChange} dropdownMenuStyle={{ maxHeight: 500 }} optionLabelProp="children" optionFilterProp="text" backfill required>
                                    {
                                        this.state.productList.map(function (product, key) {
                                            return (
                                                <Option key={key} text={product.name} value={product.id}>
                                                    {loaderValue === "true" ? `${itemLoader}` :
                                                        `${product.name}`
                                                    }
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <br /> <br />
                        <Row noGutters={true}>

                            {
                                (images.length !== 0) ?
                                    <Col md={{ size: 8 }}>

                                        <Card outline id="productDescCard">
                                            <Row noGutters={true}>
                                                <Col md={{ size: 6 }}>
                                                    <label className="productNamePrice">{productDesc.name}</label>
                                                </Col>
                                                <Col md={{ size: 6 }}>
                                                    <label className="productNamePrice">${productDesc.price}</label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={{ size: 6 }}>
                                                    <div>
                                                        Color: {productDesc.color} {" "}
                                                        <i class="fa fa-square-o" aria-hidden="true" style={{ backgroundColor: `${productDesc.color}`, outlineColor: "black" }}></i>
                                                    </div>
                                                </Col>
                                                <Col md={{ size: 6 }} className="rating">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={{ size: 10, offset: 1 }}>
                                                    <br />
                                                    <label id="productDescription">{productDesc.description}</label>
                                                </Col>
                                            </Row>
                                        </Card>

                                        <br /> <br />

                                        <Card outline color="success">
                                            <CardHeader>
                                                <Button outline color="primary" size="lg" id="btnMen">
                                                    <i class="fa fa-male fa-1x" aria-hidden="true"></i> MEN</Button>{' '} {' '}
                                                <Button outline color="info" size="lg" id="btnWomen">
                                                    <i class="fa fa-female fa-1x" aria-hidden="true"></i> WOMEN</Button>{' '}
                                            </CardHeader>
                                            <CardBody>
                                                <CardText>
                                                    <div>
                                                        <div> <ColorRadioButton /></div>
                                                        <div> <SizeRadioButton /></div>
                                                    </div>
                                                </CardText>
                                            </CardBody>
                                            <Button color="success" onClick={this.addToCart}>Add to BAG</Button>
                                        </Card>

                                    </Col>
                                    :
                                    <Col md={{ size: 8 }}>
                                        <Card outline color="warning">
                                            <CardHeader></CardHeader>
                                            <CardText>
                                                <div>
                                                    <Jumbotron fluid>
                                                        <Container fluid>
                                                            <h1 className="display-3">
                                                                No Product Selected Yet {" "}
                                                                <i class="fa fa-frown-o" aria-hidden="true"></i>
                                                            </h1>
                                                            <p className="lead">Please select Product from above select box to get it's Description and Price.</p>
                                                        </Container>
                                                    </Jumbotron>
                                                </div>
                                            </CardText>
                                            <CardFooter></CardFooter>
                                        </Card>

                                    </Col>
                            }
                        </Row>

                    </Col>
                    <Col md={{ size: 4 }}>
                        {
                            (images.length !== 0) ?
                                <ImageGallery items={images} />
                                :
                                <ImageGallery items={demoImage} />
                        }
                    </Col>
                </Row>

                {/***************** PRODUCT RECOMMENDATION SECTION ****************/}
                <br /><br /><br /><br />

                <Container fluid={true}>
                    <Row>
                        <Card id="recommend-section-style">
                            <CardHeader> <label id="recHeader">
                                You'll Also Like  {" "} <i class="fa fa-heart" aria-hidden="true"></i>
                            </label></CardHeader>
                            <Col md={{ size: 12 }}>
                                <div style={{ "padding": "0 60px", "maxWidth": 1000, "margin": "0 auto" }}>
                                    <ItemsCarousel
                                        placeholderItem={<div style={{ height: 300, background: '#EEE' }} />}
                                        enablePlaceholder={true}
                                        numberOfPlaceholderItems={6}
                                        numberOfCars={6}
                                        gutter={12}
                                        slidesToScroll={2}
                                        chevronWidth={60}
                                        outsideChevron={true}
                                        showSlither={false}
                                        firstAndLastGutter={false}
                                        activeItemIndex={this.state.activeItemIndex}
                                        requestToChangeActive={value => this.setState({ activeItemIndex: value })}
                                        rightChevron={<i class="fa fa-hand-o-right fa-2x" aria-hidden="true"></i>}
                                        leftChevron={<i class="fa fa-hand-o-left fa-2x" aria-hidden="true"></i>}
                                    >
                                        {this.state.allImageList.map((data, key) =>
                                            <div key={key} style={{ height: 200 }}>
                                                <img src={data.url} alt="image" style={{ width: "200px", height: "200px" }} />
                                            </div>
                                        )}
                                    </ItemsCarousel>
                                </div>
                            </Col>
                        </Card>
                    </Row>
                </Container>

            </Container>
        )
    }
}