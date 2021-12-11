import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Container, Row, Col
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import BikeListings from './bikeListings'
import axios from 'axios';// CSS
class FavouriteListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // favouriteData: JSON.parse(localStorage.getItem('addFavourite')),
            favouriteData: this.props.location.state.favlisting.favCard,
            storageToken: JSON.parse(localStorage.getItem('react_login_app')),
        }
        this.showMessage = this.showMessage.bind(this)
    }


    siteSelectedCallback = () => {
        this.props.history.push('/postdetails')
    }

    async showMessage(delData){
        let delrecord = {
            userId: this.state.storageToken.userId,
            cardId: delData._id
        }
        await axios.post('/api/users/deletefavcard', delrecord)
        .then(res => {
            console.log(res)
            if(res.data.success === true){
                this.props.history.push('/')
            }
            else{
                NotificationManager.error(res.data.message)
            }
        })
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
                fontSize: '30px',
                fontWeight: '700',
                fontFamily: 'Fira Sans, sans-serif',
                background: 'rgb(63, 184, 101)'
            },
            image: {
                width: '100%', height: '250px', objectFit: 'cover'
            }
        }
        return (
            <div>
                {/* Search Results */}

                <div>
                    <div>
                        <Navbar dark expand="md" className="bg-color shadow-lg">
                            <Container>
                                <NavbarBrand tag={Link} to="/">
                                    <h3 className="text-success" >
                                        <img src={'/logo.svg'} style={{ width: '100%' }} />
                                    </h3>
                                </NavbarBrand>
                            </Container>
                        </Navbar>
                    </div>
                    <Container className="mt-5">
                        <Row>
                            {/* <h3 className="text-black pl-md-4 pl-3" style={styles.text}> {this.state.search_data.length > 0 ? "Search Results" : "Sorry No Record Found"}</h3> */}
                            {this.state.favouriteData ?
                                <h3 className="text-black pl-md-4 pl-3" style={styles.text}> Favourite </h3>
                                : ''
                            }

                            <Col sm="12">
                                <Carousel
                                    responsive={responsive}>
                                    {this.state.favouriteData ?
                                        (this.state.favouriteData.map((lists, idx) => {
                                            var rightNow = new Date(lists.startDate);
                                            var date = rightNow.toISOString().substring(0, 10);
                                            return (
                                                <div className="card m-md-4 m-0" key={idx}>
                                                    <div>
                                                        <img className="img-fluid w-100" style={styles.image}
                                                            src={`data:image/png;base64,${lists.project_image}`} />
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="small text-muted text-left text-uppercase mb-2">{lists.product_title}</p>
                                                        <h5 className="text-left">{lists.category}</h5>
                                                        <p className="text-left text-success">Rs {lists.expectedPrice} <span className="text-secondary"> {lists.rentPer? '/' + lists.rentPer: ''}</span>
                                                            <span className='text-success float-right' onClick={() => this.showMessage(this.state.favouriteData[idx])}>
                                                                <FontAwesomeIcon icon={faHeart} size="1x" />
                                                            </span></p>
                                                        <p className="text-left text-secondary"><FontAwesomeIcon icon={faMapMarkerAlt} size="1x" /> {lists.addLocation} <span className="text-secondary float-right">{date}</span></p>
                                                        <p className="text-success text-left" onClick={() => this.props.history.push({
                                                            pathname: '/postdetails',
                                                            state: { detail: this.state.favouriteData[idx] }
                                                        })} >
                                                            Show Details
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })) :
                                        (
                                            <h4 className="text-success pl-md-4 pl-3" style={styles.text}><FontAwesomeIcon icon={faHome} size="1x" /> / Sorry No Record Found</h4>

                                        )
                                    }
                                </Carousel>
                            </Col>
                        </Row>
                    </Container>
                    <BikeListings />
                </div>
                <NotificationContainer />

            </div >

        );
    }
}
export default withRouter(FavouriteListing);