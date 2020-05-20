import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';

// views
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import Ad from './views/manage/Ad';
import Content from './views/manage/Content';

// mobx
import { inject, observer } from 'mobx-react';
import * as store from './stores/AuthStore';

const style = () => ({
  root: {
    backgroundColor: '#ffffff',
  }
});

@inject('authStore')
@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceType: '',
      browserType: '',
    };

    moment.updateLocale('ko');
  }

  componentDidMount() {
    console.log('========== A Manage App did mount ==========');

    /*
      AXIOS SETTINGS

      1. Request Interceptor
      2. Response Interceptor
    */

    // this.props.authStore.checkLogin();
  }

  render() {
    const { isLoggedIn, loginUser } = this.props.authStore;
    return (
      <>
        {isLoggedIn ? (
          <Router>
            <Route exact path="/"         render={() => <Home userId={loginUser.userId} />} />
            <Route path="/manage/ad"      render={() => <Ad userId={loginUser.userId} />} />
            <Route path="/manage/content" render={() => <Content userId={loginUser.userId} />} />
          </Router>
        ) : (
          <Router>
            <Route exact path="/"         render={() => <Home userId={loginUser.userId} />} />
            <Route path="/signup"         render={() => <Signup />} />
            <Route path="/signin"         render={() => <Signin />} />
          </Router>
          )}
      </>
    );
  }
}

export default App;
