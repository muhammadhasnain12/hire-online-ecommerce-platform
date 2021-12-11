import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

// Components
import AppNavbar from './AppNavbar';
import PostAddForm from './postAddForm';
import HomeRenderComponent from'./HomeRenderComponent'
import PostDetail from './postDetail'
import ShowCategory from './showCategory'
import FavouriteListing from './favouriteListing'
// import history from './history';

// CSS
import './Home.css';

export default class SwitchRoute extends React.Component {

    render() {
        return (
            <div className="Home_CSS">
                {/* <AppNavbar /> */}
                <Switch>
                    <Route exact path='/' component={HomeRenderComponent} />
                    <Route path='/postadd' component={PostAddForm} />
                    <Route path='/postdetails' component={PostDetail} />
                    <Route path='/showcategory' component={ShowCategory} />
                    <Route path='/favouritelistings' component={FavouriteListing} />

                    {/* <Route exact path='/' Component={AppNavbar}>
                        <Route path='/home' component={Home} />
                        <Route path='/page' component={Page} />
                    </Route> */}
                </Switch>
            </div>
        );
    }
}