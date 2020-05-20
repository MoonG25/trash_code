import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  createMuiTheme,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
  withStyles,
  Tooltip,
  Divider,
} from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';

import { inject, observer } from 'mobx-react';

const theme = createMuiTheme();

const logoWidth = 120;

const useStyles = {
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    borderBottom: '1px solid #eee',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      borderBottom: '1px solid #ddd',
    },
  },
  title: {
    marginLeft: (theme.sideMenuWidth - logoWidth) / 2,
    flexGrow: 1,
  },
  iconMenu: {
    [theme.breakpoints.down('xs')]: {
      order: 1,
      justifyContent: 'flex-start',
      width: 'auto',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '& img': {
      height: '60px',
    },
  },
  loginBtn: {
    borderRadius: 50,
    fontWeight: 400,
    fontSize: 13,
    minWidth: 86,
    height: 32,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#ecd2d2',
    },
  },
  logOut: {
    fontWeight: 400,
    fontSize: 14,
    borderRadius: 50,
  },
  signUpBtn: {
    backgroundColor: '#cf1a1a',
    color: '#ffffff',
    borderRadius: 50,
    fontWeight: 400,
    fontSize: 13,
    minWidth: 86,
    height: 34,
    boxShadow: 'none',
  },
  myPage: {
    boxShadow: 'none',
    borderRadius: 50,
    fontWeight: 400,
    fontSize: 13,
  },
};

@inject('authStore')
@observer
class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    if (this.props.userId) {
      // something
    }
  }

  componentDidUpdate() {
    if (this.props.userId) {
      // something
    }
  }

  render() {
    const { classes } = this.props;
    const { isLoggedIn, doLogout } = this.props;

    return (
      <div>
        <AppBar position="fixed" color={"inherit"} elevation={0} className={classes.appBar}>
          <Toolbar className={classes.appBarWrap}>
            <div className={classes.title}>
              <Grid container alignItems={"center"} spacing={1}>
                <NavLink className={classes.link} to="/">
                  <img src="/images/logo.png" alt="" />
                </NavLink>

                {isLoggedIn ? (
                  <div>
                    <Hidden xsDown>
                      <Button className={classes.titleBtn} style={{marginLeft: 16}} name="ad" onClick={() => this.handlePushLink('/manage/ad')}>
                        광고
                      </Button>
                      <Button className={classes.titleBtn} onClick={() => this.handlePushLink('/manage/content')}>
                        콘텐츠
                      </Button>
                      <Button className={classes.titleBtn} onClick={() => this.handlePushLink('')}>
                        통계
                      </Button>
                    </Hidden>
                  </div>
                ) : <></>}
              </Grid>
            </div>

            {isLoggedIn ? (
              <Grid className={classes.iconMenu}>
                <Hidden xsDown>
                  <Button className={classes.logOut} style={{marginLeft: 3, marginRight: 3}} onClick={doLogout}>
                    로그아웃
                  </Button>
                  <Button className={classes.myPage} style={{marginLeft: 3, marginRight: 3}} onClick={this.handleClickMyPage} name="myPage" variant="contained">
                    마이페이지
                  </Button>
                </Hidden>
              </Grid>
            ) : (
              <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1} className={classes.iconMenu}>
                <Hidden xsDown>
                  <Grid item>
                    <Button className={classes.loginBtn} variant="contained" onClick={this.handleClickLogin}>
                      로그인
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button className={classes.signUpBtn} variant="contained" color="secondary" onClick={() => this.props.history.push('/signup')}>
                      회원가입
                    </Button>
                  </Grid>
                </Hidden>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(TopBar));