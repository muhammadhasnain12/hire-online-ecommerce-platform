import React, { Component } from "react";
import {
  Container, Row, Col, Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label,
  NavbarBrand, Navbar
} from 'reactstrap';
import { postReviews } from '../actions/userActions';
import { bookingProduct } from '../actions/userActions';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faBriefcase, faUser, faGift } from '@fortawesome/free-solid-svg-icons'
import BikeListings from './bikeListings'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';
// import StarRating from './react-star-rating'
import StarRatings from 'react-star-ratings';

export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_record: this.props.location.state.detail,
      renteremail: this.props.location.state.detail.renter_email,
      ismodalOpen: false,
      signUpError: '',
      user_name: '',
      user_number: '',
      seller_email: this.props.location.state.detail.renter_email,
      user_message: '',
      reviews: '',
      reviewverName: '',
      showText: false,
      reviews_data: [],
      rating_data: [],
      onReviews: false,
      storageToken: JSON.parse(localStorage.getItem('react_login_app')),
      rating: 1,
      activeNumber: true
    }
    console.log("state data is ", this.state.list_record)
    this.submitProduct = this.submitProduct.bind(this)
    this.onReviewsSubmit = this.onReviewsSubmit.bind(this)
    this.changeRating = this.changeRating.bind(this)
  }

  async componentDidMount() {
    let id = this.state.list_record._id
    await axios
      .post('api/users/findreviews', { id })
      .then(res => {
        console.log("Reviews Api result is", res);
        if (res.data.success)
          this.setState({
            reviews_data: res.data.reviews,
            rating_data: res.data.reviews.rating,
            onReviews: res.data.success
          })
      })
  }

  // toggle = () => {
  //   this.setState({
  //     ismodalOpen: !this.state.ismodalOpen,
  //     signUpError: ''
  //   });
  // }
  toggleRating = () => {
    this.setState({
      showText: !this.state.showText,
      signUpError: ''
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  }
  async onReviewsSubmit() {
    const addDetails = {
      id: this.state.list_record._id,
      reviewverName: this.state.reviewverName,
      reviews: this.state.reviews,
      rating: this.state.rating

    }
    console.log("Data is = ", addDetails)
    const res = await postReviews(addDetails);
    window.location.reload(false);
  }

  async submitProduct() {
    if (this.state.storageToken) {
      const bookingData = {
        user_name: this.state.user_name,
        seller_email: this.state.seller_email,
        user_number: this.state.user_number,
        user_message: this.state.user_message
      }
      console.log("bookingData", bookingData)
      const res = await bookingProduct(bookingData);

      console.log("Booking Data Response", res)

      setTimeout(() => {
        this.setState({ showText: true })
      }, 3000);
    }
    else {
      NotificationManager.warning("Pleae login first!")
    }
  }

  bookProduct = () => {
    if (this.state.storageToken) {
      this.setState({
        ismodalOpen: true
      })
    }
    else {
      NotificationManager.warning('Please Login First');
    }

  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    });

  }
  activePhoneNumber = () => {
    if (this.state.storageToken) {
      this.setState({
        activeNumber: !this.state.activeNumber
      })
    }
    else {
      NotificationManager.warning('Please Login First');
    }
  }
  render() {
    const styles = {
      text1: {
        fontSize: '30px',
        fontWeight: '700',
        fontFamily: 'Fira Sans, sans-serif',
        background: 'rgb(63, 184, 101)'
      },
      product: {
        display: 'flex',
        flexDirection: 'row',
        padding: '15px',
        border: '1px solid rgb(223, 223, 223)',
        margin: '10px 0px',
        fontSize: '15px'
      },
      txtbdr: {
        border: '1px solid rgb(223, 223, 223)',
        fontSize: '15px'
      },
      bgcolor: {
        background: 'rgb(63, 184, 101)'
      },
      bgColorBlack: {
        fontSize: '20px',
        fontWeight: '500',
        fontFamily: 'Fira Sans, sans-serif',
        background: 'black'
      },
      emailDetail: {
        fontSize: '15px',
        fontWeight: '500',
        fontFamily: 'Fira Sans, sans-serif',
        background: '#363b4d'
      },
      text: {
        fontSize: '20px',
        fontWeight: '500',
        fontFamily: 'Fira Sans, sans-serif',
      },
      darkSuccess: {
        background: '#33a137'
      },
    }

    return (
      <div>
        <div>
          <Navbar dark expand="md" className="bg-ligt shadow-lg">
            <Container>
              <NavbarBrand tag={Link} to="/">
                <h3 className="text-success" >
                  <img src={'/logo.svg'} style={{ width: '100%' }} />
                </h3>
              </NavbarBrand>
            </Container>
          </Navbar>
        </div>
        <Container>
          <Row className="mt-5">
            <Col sm="8" md="8" xs="12" className="text-left">
              <p className="text-success text-left">{this.state.list_record.category} /</p>
              <hr />
              <h4 className="text-left">{this.state.list_record.product_title}</h4>
              <p>Posted By: <span className="text-success">{this.state.list_record.renter_name}</span></p>
              <img className="img-fluid w-100"
                src={`data:image/png;base64,${this.state.list_record.project_image}`} style={{ width: '100%' }} />
              <Row className="product-info mt-5 shadow-lg mb-5 bg-white rounded" style={styles.product}>
                {/* <h5>Details</h5> */}
                <Col sm="12" md="12" xs="12">
                  <h5 className="ml-2">Details</h5>
                </Col>
                <Col xs="12" sm="5" md="5">
                  <ul style={{ listStyle: 'none' }} className="text-left p-2">
                    <li>
                      <b>Price: </b> <span className="float-right">PKR {this.state.list_record.expectedPrice}</span>
                    </li>
                    {/* <li>
                      <b>Rent Value: </b> <span className="float-right">PKR {this.state.list_record.rentValue}</span>
                    </li> */}
                    <li>
                      <b>Product Negotiable: </b> <span className="float-right"> {this.state.list_record.priceNegotiable} </span>
                    </li>
                    <li>
                      <b>Location: </b><span className="float-right"> {this.state.list_record.addLocation} </span>
                    </li>
                  </ul>
                </Col>
                <Col xs="12" sm="6" md="6">
                  <ul style={{ listStyle: 'none' }}>

                    {
                      this.state.list_record.startDate?
                      (
                        <div>
                          <li>
                            <b>Condition: </b><span className="float-right"> {this.state.list_record.product_condition} </span>
                          </li>
                          <li>
                            <b>Availability From: </b> <span className="float-right"> {(this.state.list_record.startDate).split(`T00:00:00.000Z`)}</span>
                          </li>
                          <li>
                            <b>Availability To: </b> <span className="float-right"> {(this.state.list_record.startDate).split("T00:00:00.000Z") } </span>
                          </li>
                          <li>
                            <b>Rental Period: </b> <span className="float-right"> 30 Days </span>
                          </li>
                        </div>
                      )
                      :''

                    }
                    
                    
                    
                  </ul>
                </Col>
              </Row>
              {/* Description */}
              <Row className="product-info mt-5 shadow-lg mb-5 bg-white rounded" style={styles.product}>
                {/* <h5>Details</h5> */}
                <Col sm="12" md="12" xs="12">
                  <h5 style={styles.text}>Description</h5>
                </Col>
                <Col sm="12" md="12">
                  <p>{this.state.list_record.product_description}</p>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <div class="fb-comments" data-href="http://localhost:3000/postdetails" data-width="100%"
                    data-lazy="true"
                    data-colorscheme="dark" data-numposts="25"></div>
                </Col>
              </Row>


              {/* // Reviews taking Section*/}
              <div>
                {
                  this.state.showText ? (
                    <div>
                      <Modal isOpen={this.state.showText} toggle={this.toggleRating} className={this.props.className}>
                        <ModalHeader toggle={this.toggleRating}>Booked Product</ModalHeader>
                        <ModalBody>
                          <Form>
                            <FormGroup>
                              <Label for="user" className="mt-2">Enter Your Name:</Label>
                              <Input
                                type="text"
                                name="reviewverName"
                                id="reviewverName"
                                placeholder="enter name..."
                                onChange={this.onChange}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="user" className="mt-2">Reviews about product:</Label>
                              <Input
                                type="text"
                                name="reviews"
                                id="reviews"
                                placeholder="add your reviews..."
                                onChange={this.onChange}
                              />
                            </FormGroup>
                            {/* Star Rating */}
                            <FormGroup>
                              <Label for="user" className="mt-2">Reviews about product:</Label>
                              <StarRatings
                                rating={this.state.rating}
                                starRatedColor="green"
                                onChange={this.onChange}
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                              />
                            </FormGroup>
                          </Form>
                        </ModalBody>

                        <ModalFooter>
                          <Button color="success" onClick={this.onReviewsSubmit} size="lg" block>Add Reviews</Button>
                        </ModalFooter>
                        <ModalFooter>
                          <p>Before Booking review product details</p>
                        </ModalFooter>
                      </Modal>
                    </div>
                  ) : null
                }

              </div>

            </Col>

            <Col sm="4" md="4" xs="12" className="mt-5">
              <div className="rounded shadow-lg text-left p-2">
                <h5 className="text-center text-dark  mt-4">PKR {this.state.list_record.rentPer? this.state.list_record.expectedPrice + " / " + this.state.list_record.rentPer : this.state.list_record.expectedPrice}</h5>
                <div className="ml-4 mr-4 mt-4">
                  <Button block size="md" style={styles.darkSuccess} className="border border-success" onClick={this.activePhoneNumber}>
                    {
                      this.state.activeNumber ?
                        (
                          <div>
                            <FontAwesomeIcon icon={faPhone} size="2x" /> Call
                          </div>
                        )
                        : (
                          <div>
                            +92 {this.state.list_record.renter_number}
                          </div>
                        )
                    }
                  </Button>

                  <Form>
                    <FormGroup className="mt-4">
                      {/* <Label for="user">User Name:</Label> */}
                      <Input
                        className="bg-light mt-3"
                        type="text"
                        name="user_name"
                        id="user_name"
                        placeholder="Name.."
                        onChange={this.onChange}
                      />
                      {/* <Label for="user" className="mt-2">User Number:</Label> */}
                      <Input
                        className="bg-light mt-3"
                        type="text"
                        name="user_number"
                        id="user_number"
                        placeholder="Phone Number..."
                        onChange={this.onChange}
                      />
                      {/* <Label for="user" className="mt-2">Seller Email:</Label> */}
                      <Input
                        className="bg-light mt-3"
                        type="email"
                        name="seller_email"
                        id="seller_email"
                        value={this.state.seller_email}
                        onChange={this.onChange}
                      />
                      {/* <Label for="user" className="mt-2">Message:</Label> */}
                      <Input
                        className="bg-light mt-3"
                        type="text"
                        name="user_message"
                        id="user_message"
                        placeholder="send offer..."
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </Form>
                  {/* Booked product */}
                  <Button outline color="success" size="lg" block className="mt-4 mb-4" onClick={this.submitProduct}  >Book Product</Button>

                </div>
              </div>
              {/* #### Seller Contact Detail #### */}
              <div className="text-white rounded text-left mt-5" style={styles.txtbdr}>
                <h5 className="text-white p-3" style={styles.bgColorBlack}>Reviews and Rating</h5>
                <div className="text-white rounded-lg text-left p-2 m-5">
                  <Row>
                    <Col sm="12">
                      {
                        this.state.onReviews ?
                          (
                            <div>
                              {
                                this.state.reviews_data.reviewverName.map((rec, idx) => {
                                  // console.log("Rating data =", this.state.rating_data.rating[0])
                                  return (
                                    <div>
                                      <div className="mt-md-2 mt-0 text-success">
                                        <FontAwesomeIcon color="success" icon={faUser} size="2x" />
                                        <span className="text-success pl-3" style={styles.text} key={idx}> {rec}</span>
                                      </div>

                                      <p className="text-dark text-justify text-left pt-2" key={idx}>{this.state.reviews_data.reviews[idx]}
                                      </p>
                                      <p>
                                        <StarRatings
                                          rating={this.state.rating_data[idx]}
                                          starRatedColor="green"
                                          numberOfStars={5}
                                          starDimension="30px"
                                          name='rating'
                                        />
                                      </p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          )
                          : (
                            <div>
                              <h5 className="text-secondary">Right now no reviews added about this product </h5>
                            </div>
                          )
                      }
                    </Col>
                  </Row>

                </div>
                {/* Phone number and email show code must remove at the end */}
                {/* <div style={styles.bgcolor} className="text-white rounded-lg text-left p-2 m-3">
                  <Row>
                    <Col sm="1">
                    </Col>
                    <Col sm="2">
                      <div className="text-center mt-md-2 mt-0"><FontAwesomeIcon icon={faPhone} size="2x" /></div>
                    </Col>
                    <Col sm="8" className="mt-md-0 mt-3">
                      <h5> {this.state.list_record.renter_number}</h5>
                      <p>Last updated: 6 months ago</p>
                    </Col>
                  </Row>

                </div>
                <div className="text-white bg-dark rounded-lg text-left p-2 m-3 mb-md-5 mb-0">
                  <Row>
                    <Col sm="1">
                    </Col>
                    <Col sm="2">
                      <div className="text-center mt-md-3 mt-0"><FontAwesomeIcon icon={faBriefcase} size="2x" /></div>
                    </Col>
                    <Col sm="8" className="pt-md-2 mt-md-0 mt-3">
                      <h6 style={styles.emailDetail}> {this.state.list_record.renter_email}</h6>
                      <p>Place your best offer</p>
                    </Col>
                  </Row>

                </div> */}
              </div>

              {/* ##### Book Product #### */}
              {/* <div className="text-white rounded text-left mt-5" style={styles.txtbdr}>
                <Button className="btn-success btn-lg btn-block" onClick={this.bookProduct}  >Book Product</Button>
              </div> */}

            </Col>

          </Row>

        </Container>
        <BikeListings />

        {/* Uneccessary Book product Modal Code must remove it at the end*/}
        {/* #############################  */}
        {/* <Modal isOpen={this.state.ismodalOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Booked Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="user">User Name:</Label>
                <Input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Name.."
                  onChange={this.onChange}
                />
                <Label for="user" className="mt-2">User Number:</Label>
                <Input
                  type="text"
                  name="user_number"
                  id="user_number"
                  placeholder="Phone Number..."
                  onChange={this.onChange}
                />
                <Label for="user" className="mt-2">Seller Email:</Label>
                <Input
                  type="email"
                  name="seller_email"
                  id="seller_email"
                  value={this.state.seller_email}
                  onChange={this.onChange}
                />
                <Label for="user" className="mt-2">Message:</Label>
                <Input
                  type="text"
                  name="user_message"
                  id="user_message"
                  placeholder="send offer..."
                  onChange={this.onChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="success" onClick={this.submitProduct} size="lg" block>Booked</Button>
          </ModalFooter>
          <ModalFooter>
            <p>Before Booking review product details</p>
          </ModalFooter>
        </Modal>
        <NotificationContainer /> */}
        <NotificationContainer />
      </div>
    );
  }
}
