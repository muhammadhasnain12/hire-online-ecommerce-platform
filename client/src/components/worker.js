import React, { Component } from 'react';
import { addFavourite } from '../actions/userActions'
import {
    Button,
    Container, Row, Col, Card, CardTitle, CardText,
    Form, FormGroup, Label, Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart, faMapMarkerAlt, faUserTie, faBell, faDollarSign, faHandshake } from '@fortawesome/free-solid-svg-icons'
import Carousel from "react-multi-carousel";
import { withRouter } from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications';
// CSS
// import './AppNavbar.css'


class Worker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workerIcon: [faUserTie, faBell, faHandshake, faDollarSign],
            workerTitle: ['Create An Account', 'Post An Advert', 'Communication', 'Start Earning'],
            workerDescription: ['Start your journey by creating your very first account to gain cool options which will allow you to Rent',
                'Now when you are our member post your very first advert and make sure you be descriptive as possible along with images',
                'After Posting Add Communicate with Each Other Through our Application and satisfied with product',
                'Is your advert ready and live? Now sit back, enjoy and wait for that very first phone call and start earning money '
            ],
            iconText: ['Automobile', 'Electronics', 'Medicine', 'Sports', 'Fashion', 'Furniture'],
            category: '',
            location: '',
            product_data: [],
            isSearch: '',
            storageToken: JSON.parse(localStorage.getItem('react_login_app')),
        }
        this.handleAddQuantity = this.handleAddQuantity.bind(this)
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    async searchProduct() {
        let searchData = {
            projectCategory: this.state.category,
            location: this.state.location
        }
        console.log("Search Data is = ", { searchData })
        await axios
            .post('api/Users/searchpostwithlocation', { searchData })
            .then(res => {
                console.log("search result", res);
                this.setState({
                    product_data: res.data.PostResult,
                    isSearch: res.data.success
                })
                // data_success = res.data.success;
                // data_error = res.data.message;
            })
    }
    async handleAddQuantity(addfavourite){
        let favListing = {
            userID : this.state.storageToken.userId,
            favCard : addfavourite, 
          }
          let record = await addFavourite(favListing)
        NotificationManager.success('Product added to Favourite');
      }
      loggedIn() {
        NotificationManager.warning('Please Login First');
      }

    render() {
        const styles = {
            text: {
                fontSize: '30px',
                fontWeight: '700',
                fontFamily: 'Fira Sans, sans-serif'
            },
            circleSize: {
                backgroundColor: '#000000',
                width: '100px', height: '100px', borderRadius: '50%'
            },
            bgColor: {
                backgroundColor: '#000000',
            },
            image: {
                width: '100%', height: '250px', objectFit: 'cover'
            },
            text1: {
              fontSize: '1rem',
              fontWeight: '200',
              fontFamily: 'Fira Sans, sans-serif'
            },
        }
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };
        const { iconText } = this.state;

        let textList = iconText.length > 0
            && iconText.map((item, i) => {
                return (
                    <option key={i} value={item}>{item}</option>
                )
            }, this);

        let comp;

        if (this.state.storageToken) {
            comp = (
                <Container className="mt-5">
                    {/* Origional Results */}
                    <Row>
                        <h4 className="text-success pl-md-4 pl-3" style={styles.text}><FontAwesomeIcon icon={faHome} size="1x" /> / {this.state.product_data.length ? this.state.category : "Sorry No Record Found"}</h4>
                        <Col sm="12" className="mt-4">
                            <Carousel
                                responsive={responsive}>
                                {this.state.product_data.map((lists, idx) => {
                                    // console.log("DAta =", lists )
                                    var rightNow = new Date(lists.startDate);
                                    var date = rightNow.toISOString().substring(0, 10);
                                    return (
                                        <div className="card mr-md-4 mr-0" key={idx}>
                                            <div>
                                                <img className="img-fluid w-100" style={styles.image}
                                                    src={`data:image/png;base64,${lists.project_image}`} />
                                            </div>

                                            <div className="card-body" style={styles.text1}>

                                                <p className="small text-muted text-left text-uppercase mb-2">{lists.product_title}</p>
                                                <h5 className="text-left">{lists.category}</h5>
                                                <p className="text-left text-success">Rs {lists.expectedPrice} <span className="text-secondary"> {lists.rentPer? '/' + lists.rentPer: ''}</span>

                                                    <span className='text-secondary float-right' onClick={() => { this.handleAddQuantity(this.state.product_data[idx]) }}>
                                                        <FontAwesomeIcon className={this.state.addFavourite ? "text-sucess" : "text-secondary"} icon={faHeart} size="1x" />
                                                    </span>

                                                </p>
                                                <p className="text-left text-secondary"><FontAwesomeIcon icon={faMapMarkerAlt} size="1x" /> {lists.addLocation} <span className="text-secondary float-right">{date}</span></p>
                                                <p className="text-success text-left" onClick={() => this.props.history.push({
                                                    pathname: '/postdetails',
                                                    state: { detail: this.state.product_data[idx] }
                                                })} >
                                                    Show Details
                                                </p>
                                            </div>

                                        </div>
                                    )
                                })}
                            </Carousel>
                        </Col>
                    </Row>
                </Container>

            )
        }
        else {
            comp = (
                <Container className="mt-5">
                    {/* Origional Results */}
                    <Row>
                        <h4 className="text-success pl-md-4 pl-3" style={styles.text}><FontAwesomeIcon icon={faHome} size="1x" /> / {this.state.product_data.length > 0 ? this.state.category : "Sorry No Record Found"}</h4>
                        <Col sm="12" className="mt-4">
                            <Carousel
                                responsive={responsive}>
                                {this.state.product_data.map((lists, idx) => {
                                    var rightNow = new Date(lists.startDate);
                                    var date = rightNow.toISOString().substring(0, 10);
                                    return (
                                        <div className="card mr-md-4 mr-0" key={idx}>
                                            <div>
                                                <img className="img-fluid w-100" style={styles.image}
                                                    src={`data:image/png;base64,${lists.project_image}`} />
                                            </div>

                                            <div className="card-body" style={styles.text1}>

                                                <p className="small text-muted text-left text-uppercase mb-2">{lists.product_title}</p>
                                                <h5 className="text-left">{lists.category}</h5>
                                                <p className="text-left text-success">Rs {lists.expectedPrice} <span className="text-secondary"> {lists.rentPer? '/' + lists.rentPer: ''}</span>

                                                    <span className='text-secondary float-right' onClick={this.loggedIn}>
                                                        <FontAwesomeIcon className={"text-secondary"} icon={faHeart} size="1x" />
                                                    </span>

                                                </p>
                                                <p className="text-left text-secondary"><FontAwesomeIcon icon={faMapMarkerAlt} size="1x" /> {lists.addLocation} <span className="text-secondary float-right">{date}</span></p>
                                                <p className="text-success text-left" onClick={() => this.props.history.push({
                                                    pathname: '/postdetails',
                                                    state: { detail: this.state.product_data[idx] }
                                                })} >
                                                    Show Details
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </Col>
                    </Row>

                </Container>

            )
        }


        return (
            <div>
                <Container className="mt-5">
                    <Row>
                        <Col sm="6" md="6" className="mt-md-5 mt-1">
                            <h3 className="text-black text-left" style={styles.text}>HOW IT WORKS
                            </h3>
                            <p className="text-secondary text-left">Quick brief on how simple yet powerful Rentable is. </p>
                            <p className="text-white text-left">- - -</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8">
                            <Row>
                                {this.state.workerIcon.map((workericon, idx) => {
                                    return (
                                        <Col md="6" key={idx} className="mt-3">
                                            <Row>
                                                <Col md="4" >
                                                    <div className="border border-dark mb-md-0 mb-4" style={styles.circleSize}>
                                                        <div className="text-success p-4 m-2"><FontAwesomeIcon icon={workericon} size="2x" /></div>
                                                    </div>
                                                </Col>
                                                <Col md="8">
                                                    <div className="text-left">
                                                        <h5 className="text-black">{this.state.workerTitle[idx]}</h5>
                                                        <p className="text-secondary text-left">{this.state.workerDescription[idx]}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                        {/* Search By Location Code */}
                        <Col md="4">
                            <Row>
                                <Col sm="12" xs="12" md="12">
                                    <Row>
                                        <Col sm="1" md="1" xs="2"></Col>
                                        <Col xs="12" sm="10" md="10" className="text-white" style={styles.bgColor}>
                                            <h4 style={{ fontSize: '100%' }} className="mt-4 font-weight-bold text-left">I'm interested in...</h4>
                                            <Form onSubmit={this.onSubmit}>
                                                <FormGroup className="text-left ">
                                                    <Label for="exampleSelect" className="mt-3 mb-3">Category</Label>
                                                    <Input type="select" name="category" id="category" onChange={this.onChange}>
                                                        {textList}
                                                    </Input>
                                                    <Label for="AddLocation" className="mt-3 mb-3">Location</Label>
                                                    <Input type="text" name="location" id="loation" placeholder="Enter Location.." onChange={this.onChange} />

                                                    <Button color="success" className="mt-4" onClick={this.searchProduct.bind(this)} size="lg" block>Search</Button>
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                        {/* <Col sm="1" md="1" xs="2"></Col> */}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                {/* Search Results */}
                {this.state.isSearch ?
                    (
                        <div>
                            {comp}
                        </div>
                // {/* Search Results */}
                    ) :
                    " "
                }
                <NotificationContainer/>
            </div>
        );
    }
}

export default withRouter(Worker);