import React from 'react';
import Nav from './Nav';
import Home from './components/Home';
import Details from './components/Details';
import Confirm from './components/Confirm';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Admin from './components/Admin';
import axios from 'axios';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: ""
        }
    }

    componentDidMount() {
        // Get user details
        axios.get("http://localhost:5000/User").then(
            (response) => {
                if(response.data[0].name === 'John') {
                    this.setState({
                        loggedInStatus: "LOGGED_IN",
                        user: response.data[0].name
                    })
                }
            }
        )
    }

    render() {
        return <Router>
            <div>
                <Nav />
                <Switch>
                    <Route path="/" exact render={ props => (
                        <Home {...props} userData={this.state} />
                    )} />
                    <Route path="/details/:hotelId" exact render={ props => (
                        <Details {...props} userData={this.state} />
                    )} />
                    <Route path="/confirm/:hotelId/:roomId" exact render={ props => (
                        <Confirm {...props} userData={this.state} />
                    )} />
                    <Route path="/about" exact render={ props => (
                        <About {...props} userData={this.state} />
                    )} />
                    <Route path="/contact" exact render={ props => (
                        <Contact {...props} userData={this.state} />
                    )} />
                    <Route path="/admin" exact render={ props => (
                        <Admin {...props} userData={this.state} />
                    )} />
                    <Route path="*" exact render={ props => (
                        <NotFound {...props} userData={this.state} />
                    )} />
                </Switch>
            </div>
        </Router>
    }
}

export default App;
