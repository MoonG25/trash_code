import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

// components
import TopBar from './components/TopBar';

const styles = () => ({
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
    const { classes } = this.props;
    const { isLoggedIn, loginUser } = this.props.authStore;

    return (
      <div className={classes.root}>
        <Router>

          <TopBar isLoggedIn={isLoggedIn} userId={loginUser.userId} doLogout={() => this.props.authStore.doLogout()} />

          {isLoggedIn ? (
            <Switch>
              <Route exact path="/"         render={() => <Home userId={loginUser.userId} />} />
              <Route path="/manage/ad"      render={() => <Ad userId={loginUser.userId} />} />
              <Route path="/manage/content" render={() => <Content userId={loginUser.userId} />} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/"         render={() => <Home userId={loginUser.userId} />} />
              <Route path="/signup"         render={() => <Signup />} />
              <Route path="/signin"         render={() => <Signin />} />
            </Switch>
            )}
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
