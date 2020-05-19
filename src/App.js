import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// views
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import Ad from './views/manage/Ad';
import Content from './views/manage/Content';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <>
        {isLoggedIn ? (
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/manage/ad" component={Ad} />
            <Route path="/manage/content" component={Content} />
          </Router>
        ) : (
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
          </Router>
          )}
      </>
    );
  }
}

export default App;
