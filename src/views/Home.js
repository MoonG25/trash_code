import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';

@inject('authStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render () {
    const { isLoggedIn } = this.props.authStore;
    return (
      <div>Home {this.props.userId}</div>
    )
  }
}

export default Home;