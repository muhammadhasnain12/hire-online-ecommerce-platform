import React, { Component } from 'react';
import { addFavourite } from '../actions/userActions'
import {
    Navbar,
    NavbarBrand,
    Container, Row, Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { faTruckMonster, faMapMarkerAlt, faHeart, faHome } from '@fortawesome/free-solid-svg-icons'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import BikeListings from './bikeListings'
class ShowCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_data: [],
            isSearch: '',
            searchCategory: this.props.location.category,
            storageToken: JSON.parse(localStorage.getItem('react_login_app')),
        }
        this.handleAddQuantity = this.handleAddQuantity.bind(this)
    }
    async componentDidMount() {
        await axios
            .post('api/Users/searchpost', { projectCategory: this.props.location.category })
            .then(res => {
                console.log("search result", res);
                this.setState({
                    product_data: res.data.PostResult,
                    isSearch: res.data.success
                })
            })
    }

    siteSelectedCallback = () => {
        this.props.history.push('/postdetails')
    }

    async handleAddQuantity(addfavourite) {
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
        const styles = {
            text: {
                fontSize: '25px',
                fontWeight: '500',
                fontFamily: 'Fira Sans, sans-serif'
            },
            text1: {
                fontSize: '30px',
                fontWeight: '700',
                fontFamily: 'Fira Sans, sans-serif',
                background: 'rgb(63, 184, 101)'
            },
            image: {
                width: '100%',
                height: '250px',
                objectFit: 'cover'
            }
        }
        let comp;

        if (this.state.storageToken) {
        comp = (
            <Container className="mt-5">
            {/* Origional Results */}
            <Row>
            <h4 className="text-success pl-md-4 pl-3" style={styles.text}><FontAwesomeIcon icon={faHome} size="1x" /> / {this.state.product_data.length > 0 ? this.state.searchCategory : "Sorry No Record Found"}</h4>
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

                        <div className="card-body">

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
            <h4 className="text-success pl-md-4 pl-3" style={styles.text}><FontAwesomeIcon icon={faHome} size="1x" /> / {this.state.product_data.length > 0 ? this.state.searchCategory : "Sorry No Record Found"}</h4>
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

                        <div className="card-body">

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
                {this.state.isSearch ?
                    (
                        <div>
                            <div>
                                <Navbar dark expand="md" className="bg-color shadow-lg">
                                    <Container>
                                        <NavbarBrand tag={Link} to="/">
                                        <h3 className="text-success" >  
                                            <img src={'/logo.svg'} style={{width: '100%'}}/> 
                                        </h3>
                                        </NavbarBrand>
                                    </Container>
                                </Navbar>
                            </div>
                            {comp}
                            <NotificationContainer />

                            <BikeListings />
                        </div>
                    ) :
                    (
                        <h1>
                            Server is working slow!
                        </h1>
                    )
                }
            </div >

        );
    }
}
export default withRouter(ShowCategory);