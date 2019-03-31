import React, {Component} from 'react';
import './App.css';
import {
    Route,
    BrowserRouter,
    Switch,
    Router,
    Link
} from 'react-router-dom';


import DefaultTable from './demo1';
import Demo from './demo2';

export default class App extends Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <ul>
                            <li><Link to="/">默认 table</Link></li>
                            <li><Link to="/pro">ProTable</Link></li>
                        </ul>
                        <Switch>
                            <Route exact path='/' component={DefaultTable}/>
                            <Route path='/pro' component={Demo}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>

        )
    }

}

