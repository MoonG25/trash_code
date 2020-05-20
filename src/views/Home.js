import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

import axios from 'axios';

const ContentWidth = 1440;

const styles = theme => ({
  mainContainer: {
    width: '100%',
    textAlign: 'center',
    padding: 0,
    maxWidth: 'initial',
  },
  appBarSpacer: theme.mixins.toolbar,
  mainContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    height: 800,
    width: '100%',
    display: 'flex',
    backgroundImage: 'url(/images/bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: 36,
    },
  },
  titleContainerSlogan: {
    maxWidth: ContentWidth,
    margin: '0 auto',
    padding: '0 6vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title1: {
    fontSize: 52,
    fontWeight: 800,
    lineHeight: 1.2,
    color: '#333333',
    wordBreak: 'keep-all',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.3em',
    },
  },
  title2: {
    fontSize: 48,
    color: '#333333',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
  },
  title3Container: {
    paddingTop: 52,
  },
  title3: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.46)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    },
  },
  startButtonContainer: {
    paddingTop: 92,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 60,
    },
  },
  startButton: {
    margin: 12,
    width: 165,
    height: 48,
    fontSize: 16,
    borderRadius: 24,
    color: '#ffffff',
    backgroundColor: '#3c3c3c',
    '&:hover': {
      backgroundColor: '#1f1f1f',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1em',
    },
  }
});

@inject('authStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClickStart = (isLoggedIn) => {
    if (isLoggedIn) {
      this.props.history.push('/manage/ad');
    } else {
      this.props.history.push('signin');
    }
  }

  render () {
    const { classes } = this.props;
    const { isLoggedIn } = this.props.authStore;

    const renderStartButton = () => {
      if (isLoggedIn) {
        return (
          <div>
            <Button variant="contained" color="default" className={classes.startButton} onClick={() => this.handleClickStart(true)}>
              시작하기
            </Button>
          </div>
        );
      } else {
        return (
          <div>
            <Button variant="contained" color="default" className={classes.startButton} onClick={() => this.handleClickStart()}>
              시작하기
            </Button>
          </div>
        );
      }
    }

    return (
      <Container component="main" className={classes.mainContainer}>
        <div className={classes.appBarSpacer} />
        <div className={classes.mainContent}>
          <div className={classes.titleContainer}>
            <div className={classes.titleContainerSlogan}>
              <div className={classes.title1Container}>
                <Typography className={classes.title1}>
                  타이틀 슬로건이 들어오는 자리
                </Typography>
              </div>
              <div>
                <Typography className={classes.title2}>
                  서비스 이름
                </Typography>
              </div>
              <div className={classes.title3Container}>
                <Typography className={classes.title3}>
                  <span>
                    <b>관리의 시작</b><br/>
                    이 서비스를 사용해서 실시간으로 관리할 수 있고<br/>
                    현장에 있는 것처럼 생생하게 관리하세요.
                  </span>
                </Typography>
              </div>
              <div className={classes.startButtonContainer}>
                {renderStartButton()}
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default withSnackbar(withRouter(withStyles(styles) (Home)));