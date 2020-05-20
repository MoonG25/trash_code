import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ErrorIcon from '@material-ui/icons/Error';

import { inject, observer } from 'mobx-react';
import * as store from '../stores/AuthStore';

import Footer from '../components/Footer';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 80px 0 80px',
    border: '1px solid #ddd',
    marginBottom: theme.spacing(2),
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 40px 0 40px',
    },
  },
  loginText: {
    margin: theme.spacing(2, 0, 0),
    padding: theme.spacing(1, 0),
    fontWeight: 700,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  InputAdornment: {
    display: 'flex',
    alignItems: 'center',
    color: '#b0b0b0',
  },
  inputIcon: {
    color: '#8d8d8d',
    marginRight: theme.spacing(2),
    marginTop: '1em',
  },
  inputPassword: {
    '& input[type=password]': {
      fontFamily: 'initial',
    },
  },
  alignCenter: {
    textAlign: 'center',
  },
  submit: {
    padding: '12px 0',
    borderRadius: 50,
    fontSize: theme.spacing(2),
    boxShadow: 'none',
    margin: theme.spacing(2, 0, 5),
  },
  etcContainer: {
    width: '100%',
    // paddingLeft: 34,
    paddingBottom: 32, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

@inject('authStore')
@observer
class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // this.props.authStore.checkLoginId();
  }

  handleChangeId = (e) => {
    this.props.authStore.changeLoginId(e.target.value);
  };

  handleChangePassword = (e) => {
    this.props.authStore.changeLoginPassword(e.target.value);
  };

  handleKeyUpPassword = (e) => {
    if (e.keyCode === 13) {
      this.props.authStore.doLogin();
    }
  };

  handleCheckSaveId = (e) => {
    this.props.authStore.changeSaveId(e.target.checked);
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore.doLogin();
  }

  handleClickSignUp = () => {
    this.props.history.push('/signup');
  }

  handleClickFindPassword = () => {
    this.props.history.push('/findpassword');
  }

  render () {
    const { classes } = this.props;
    const { loginState, login, saveId } = this.props.authStore;

    return (
      <>
        <Container component="main" maxWidth="sm">
          <div className={classes.appBarSpacer} />
          <div className={classes.paper}>
            <img src={"/images/logo.png"} alt={""} />
            <Typography className={classes.loginText} component="h1" variant="h3">
              {loginState === store.State.Failed ? '로그인 실패' : '로그인'}
            </Typography>

            <div className={classes.form}>
              <>
                <div className={classes.InputAdornment}>
                  <MailOutlineIcon className={classes.inputIcon} />
                  <TextField  id="email"
                              name="email"
                              label="이메일 주소"
                              margin="normal"
                              value={login.id}
                              onChange={this.handleChangeId}
                              autoFocus={saveId ? false : true}
                              required fullWidth />
                </div>

                <div className={classes.InputAdornment}>
                  <VpnKeyIcon className={classes.inputIcon} />
                  <TextField  id="password"
                              type="password"
                              name="password"
                              label="비밀번호"
                              margin="normal"
                              autoComplete={"off"}
                              value={login.password}
                              className={classes.inputPassword}
                              onChange={this.handleChangePassword}
                              onKeyUp={this.handleKeyUpPassword}
                              autoFocus={saveId ? true : false}
                              required fullWidth />
                </div>
              </>

              <div className={classes.alignCenter}>
                <FormControlLabel control={<Checkbox color="primary" checked={saveId} onChange={this.handleCheckSaveId} />} label="아이디 저장" />
              </div>

              <Button type="submit"
                      className={classes.submit}
                      variant="contained"
                      disabled={loginState === store.State.Pending}
                      onClick={this.handleSubmitForm}
                      fullWidth>
                {loginState === store.State.Pending ? <CircularProgress size={22} /> : '로그인'}
              </Button>
            </div>

            <div className={classes.etcContainer}>
              <Button onClick={this.handleClickSignUp}>회원가입</Button>
              <Typography style={{paddingLeft: 3, paddingRight: 3}}>|</Typography>
              <Button onClick={this.handleClickFindPassword}>비밀번호 찾기</Button>
            </div>
          </div>
        </Container>
      </>
    )
  }
}

export default withSnackbar(withRouter(withStyles(styles)(Signin)));