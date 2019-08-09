/** >>>>>>>>>>> HomePage Product Details Section (Main section) <<<<<<<<<<<<< */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Card, CardHeader, CardFooter, CardBody, Jumbotron, CardTitle, CardSubtitle, CardText, Button, Spinner } from 'reactstrap';
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
    singleProductImage: [],
    loader: false
}

export default class ProductDetails extends Component {

    constructor(props) {
        super(props)

        this.state = defaultState;
        this.addToCart = this.addToCart.bind(this);
        this.onThumbnailClick = this.onThumbnailClick.bind(this);
        this.onSlide = this.onSlide.bind(this);
    }

    /**
     * When Image Thumbnail is clicked
     */

    onThumbnailClick = (event, index) => {
        event.preventDefault()

        let productID = index + 1;
        this.getProductInformation(productID)
    };

    /**
     * On Image Slide
     */

    onSlide(index) {
        let productID = index + 1;
        this.getProductInformation(productID)
    }

    /**
     * Load Default Product information
     */
    defaultProductDetail() {
        let productID = 8;
        this.getProductInformation(productID);
    }

    /**
     * Add product to cart
     */
    addToCart(event) {
        event.preventDefault();
        CustomToastr.warning("Currently we are not using this service!")
    }

    /**
     * Get total Count of the Product
     */

    productCount = () => {
        let numberOfProduct = CatalougeService.getProductCount()
        numberOfProduct.then((response) => {
            if (response.count && response.count > 0) {
                let count = response.count

                for (let itemCount = 1; itemCount <= count; itemCount++) {
                    this.productImageList(itemCount);
                }
            }
        }, function (err) {
            CustomToastr.error(err)
        })
    }

    /**
     *  Fetch Product Image by productId
     */

    productImageList(productID) {
        let imageListresponse = CatalougeService.getProductImageList(productID);
        imageListresponse.then(response => {

            this.state.productImages.push(response[0])

            let newProductImage = this.state.productImages.map(data => {
                var result = Object.assign({}, data)
                result.original = data.url;
                result.thumbnail = data.url;
                return result;
            })

            this.setState({ singleProductImage: newProductImage })
        }, function (error) {
            CustomToastr.error("Unable to fetch Product Images" || error)
        })
    }

    /**
    * Fetch Product Description by productId
    */

    getProductInformation = (productId) => {
        this.setState({ loader: true })
        let productResponse = CatalougeService.getProductInformation(productId)
        productResponse.then((response) => {
            let productInfo = response;
            this.setState({ productDescription: productInfo, loader: false })
        }, function (error) {
            CustomToastr.error(error)
            this.setState({ loader: false })
        })
    }

    /**
     * Fetch all the products
     */

    getProductList = () => {
        this.setState({ loader: true })
        let productResponse = CatalougeService.getProductList()
        productResponse.then((response) => {
            let productData = response;
            this.setState({ loader: false })
            this.setState({ productList: productData })
        }, function (error) {
            CustomToastr.error(error);
            this.setState({ loader: false })
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
        this.productCount();
        this.getProductList();
        this.getImageList();
        this.defaultProductDetail();
    }

    render() {

        const images = this.state.singleProductImage;
        const demoImage = DemoImageCarousel;
        const productDesc = this.state.productDescription;
        const loaderValue = this.state.loader;
        const itemLoader = "Loading Items";
        const productListLoader = this.state.productList;

        return (
            <Container fluid={true}>
                <Row noGutters={true}>
                    <Col md={{ size: 6 }}>

                        <Row noGutters={true}>
                            <Col md={{ size: 8 }}>

                                <Card outline id="productDescCard" style={{border: "none"}}>
                                    {
                                        (this.state.loader === true) ?
                                            <div>
                                                <Spinner type="grow" color="primary" />
                                                <Spinner type="grow" color="secondary" />
                                                <Spinner type="grow" color="success" />
                                                <Spinner type="grow" color="danger" />
                                                <Spinner type="grow" color="warning" />
                                                <Spinner type="grow" color="info" />
                                                <Spinner type="grow" color="light" />
                                                <Spinner type="grow" color="dark" />
                                                <br />
                                                <label> Fetching product info . . . . </label>
                                            </div>
                                            :
                                            <div>
                                                <Row noGutters={true}>
                                                    <Col md={{ size: 6 }}>
                                                        <label id="productDescription">{productDesc.description}</label>
                                                    </Col>
                                                    <Col md={{ size: 6 }}>
                                                        <label className="productPrice">{`$ ${productDesc.price} USD`}</label>
                                                    </Col>
                                                </Row>
                                                <Row noGutters={true}>
                                                    <Col md={{ size: 4 }}>
                                                        <label className="productName">{productDesc.name}</label> {" "}
                                                        <i class="fa fa-square-o" aria-hidden="true" style={{ backgroundColor: `${productDesc.color}`, outlineColor: "black" }}></i>
                                                    </Col>
                                                    <Col md={{ size: 4, offset: 2 }} className="rating">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                                        {" "}
                                                        <label>154 Reviews</label>
                                                    </Col>
                                                </Row>
                                            </div>
                                    }
                                </Card>

                              

                                <Card outline color="success">
                                    <CardHeader>
                                        <Button outline color="success" size="lg" id="btnMen">
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

                        </Row>

                    </Col>
                    <Col md={{ size: 4 }} id="imgCol">

                        <Card id="imgCard">
                            {
                                (images && images.length !== 0) ?
                                    <ImageGallery items={images} style={{ width: "350px", height: "500px" }}
                                        onThumbnailClick={this.onThumbnailClick} onSlide={this.onSlide} />
                                    :
                                    <div>
                                        <Spinner type="grow" color="success" style={{ width: '6rem', height: '6rem', alignContent: "center" }} />
                                        <br />
                                        <h5> Loading Product Images . . . . .</h5>
                                    </div>
                            }
                        </Card>

                        {/* <ImageGallery items={demoImage} onThumbnailClick={this.onThumbnailClick} /> */}

                    </Col>
                </Row>

                {/***************** PRODUCT RECOMMENDATION SECTION ****************/}
                <br /><br /><br /><br />

                <Container fluid={true}>
                    <Row>
                        <Card id="recommend-section-style">
                            <CardHeader>
                                <label id="recHeader">
                                    You'll Also Like  {" "} <i class="fa fa-heart" aria-hidden="true" style={{ color: "rgba(121, 52, 106, 0.74)" }}></i>
                                </label>
                            </CardHeader>
                            <Col md={{ size: 12 }}>
                                <div style={{ "padding": "0 60px", "margin": "0 auto" }}>
                                    <ItemsCarousel
                                        placeholderItem={<div style={{ height: 300, background: '#EEE' }} />}
                                        enablePlaceholder={true}
                                        numberOfPlaceholderItems={6}
                                        numberOfCards={6}
                                        gutter={12}
                                        slidesToScroll={2}
                                        chevronWidth={60}
                                        outsideChevron={true}
                                        showSlither={false}
                                        firstAndLastGutter={false}
                                        activeItemIndex={this.state.activeItemIndex}
                                        requestToChangeActive={value => this.setState({ activeItemIndex: value })}
                                        rightChevron={<i class="fa fa-arrow-circle-o-right fa-2x" aria-hidden="true"></i>}
                                        leftChevron={<i class="fa fa-arrow-circle-o-left fa-2x" aria-hidden="true"></i>}
                                    >
                                        {this.state.allImageList.map((data, key) =>
                                            <div key={key} style={{ height: 200 }}>
                                                <img src={data.url} alt="image" style={{ width: "200px", height: "200px" }} />
                                                <br />
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