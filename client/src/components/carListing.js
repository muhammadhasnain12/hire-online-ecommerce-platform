import React, { Component } from 'react';
import { addFavourite } from '../actions/userActions'
import {
  Button,
  Container, Row, Col
} from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class CarListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: ['audi', 'bmw', 'mustradies', 'corola'],
      product_data: [],
      search_data: [],
      isSearch: '',
      addFavourite: false,
      favouriteData: JSON.parse(localStorage.getItem('addFavourite')),
      storageToken: JSON.parse(localStorage.getItem('react_login_app')),
      signInModal: false
    }
    this.loggedIn = this.loggedIn.bind(this)
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
  }
  async componentDidMount() {
    var user = [];
    await axios
      .get('/api/users/listing')
      .then(res => {
        this.setState({
          product_data: res.data
        })
      })
  }

  toggle = () => {
    this.state.first_name = '';
    this.state.last_name = '';
    this.state.email = '';
    this.state.password = '';
    this.setState({
      signInModal: !this.state.signInModal,
      // signInError: ''
    });
    // if (this.state.signInModal) {
    //     this.setState({
    //         signInModal: !this.state.signInModal,
    //         signInError: ''
    //     });
    // }
    // if (this.state.signUpModal) {
    //     this.setState({
    //         signUpModal: !this.state.signUpModal,
    //         signUpError: ''
    //     });
    // }

  }

  async handleAddQuantity(addfavourite){
    
    let favListing = {
      userID : this.state.storageToken.userId,
      favCard : addfavourite, 
    }
    let record = await addFavourite(favListing)
    // add favourite cart to localstorage
    // addDetails(addfavourite)
    // this.setState({
    //   addFavourite: !this.state.addFavourite
    // })
    NotificationManager.success('Product added to Favourite');
    window.location.reload(false);
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
        fontSize: '30px',
        fontWeight: '700',
        fontFamily: 'Fira Sans, sans-serif'
      },
      text1: {
        fontSize: '1rem',
        fontWeight: '200',
        fontFamily: 'Fira Sans, sans-serif'
      },
      image: {
        width: '100%', height: '250px', objectFit: 'cover'
      }
    }

    let comp;

    if (this.state.storageToken) {
      comp = (
        <Container className="mt-5">
          {/* Origional Results */}
          <Row>
            <h3 className="text-black pl-md-2 pl-2" style={styles.text}>FEATURE LISTINGS</h3>
            <Col sm="12" className="mt-4">
              <Carousel
                responsive={responsive}>
                {this.state.product_data.map((lists, idx) => {
                  var rightNow = new Date(lists.startDate);
                  var res = rightNow.toISOString().substring(0, 10);

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
                        <p className="text-left text-secondary"><FontAwesomeIcon icon={faMapMarkerAlt} size="1x" /> {lists.addLocation} <span className="text-secondary float-right">{res}</span></p>
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
            <h3 className="text-black pl-md-2 pl-2" style={styles.text}>FEATURE LISTINGS</h3>
            <Col sm="12" className="mt-4">
              <Carousel
                responsive={responsive}>
                {this.state.product_data.map((lists, idx) => {
                  // console.log("DAta =", lists )
                  let rec = lists.startDate
                  var rightNow = new Date(lists.startDate);
                  var res = rightNow.toISOString().substring(0, 10);
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
                        <p className="text-left text-secondary"><FontAwesomeIcon icon={faMapMarkerAlt} size="1x" /> {lists.addLocation} <span className="text-secondary float-right">{res}</span></p>
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
        {comp}
        <NotificationContainer />
      </div >

    );
  }
}

export default withRouter(CarListings);