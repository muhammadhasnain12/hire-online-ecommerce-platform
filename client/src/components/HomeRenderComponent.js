import React, { Component } from 'react';

// Components
import SwitchRoute from './SwitchRoute';
import Login from './Login';
import AppNavbar from './AppNavbar';
import Worker from './worker' 
import CarListings from './carListing'
import BikeListings from './bikeListings'


import TawkTo from './tawkto'
// CSS
export default class HomeRenderComponent extends Component {
  render() {
    return (
      <div className="App_CSS">
        <AppNavbar />
        <Worker/>
        <CarListings/>
        <BikeListings/>
        {/* <Search/> */}
        <TawkTo/>
        {/* <SwitchRoute /> */}
      </div>
    );
  }
}