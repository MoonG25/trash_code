import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import Footer from '../components/Footer';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 80px 40px 80px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      border: '0 none',
    },
  },
  mainTitle: {
    textAlign: 'center',
    margin: theme.spacing(2, 0, 0),
    padding: theme.spacing(1, 0),
    fontWeight: 700,
  },
  mainContent: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  mainComment: {
    textAlign: 'right',
  },
  checkAgreeMargin: {
    marginTop: theme.spacing(3),
  },
  titleArea: {
    position: 'relative',
  },
  checkAgreeTotal: {
    padding: '0 4px 0 0',
  },
  termsCaption: {
    fontSize: 12,
    color: '#c1c1c1',
    fontWeight: 600,
  },
  gutterMargin: {
    margin: theme.spacing(3, 0, 2),
    '& input[type=password]': {
      fontFamily: 'initial',
    },
  },
  okButton: {
    borderRadius: 24,
  },
  successContainer: {
    textAlign: 'center',
  },
  successTitle: {
    fontSize: 38,
    color: '#333',
    paddingTop: theme.spacing(6),
  },
  successHeader: {
    fontSize: 16,
    color: '#333',
    paddingTop: theme.spacing(5),
  },
  successHeader2: {
    fontSize: 16,
    color: '#333',
  },
  successBody: {
    fontSize: 14,
    color: '#b7b7b7',
    paddingTop: theme.spacing(1),
  },
  successButton: {
    borderRadius: 24,
    fontSize: 16,
    width: 200,
    height: 48,
    marginTop: theme.spacing(4),
  },
});

const decodeURLParams = search => {
  const hashes = search.slice(search.indexOf('?') + 1).split('&');
  return hashes.reduce((params, hash) => {
    const split = hash.indexOf('=');

    if (split < 0) {
      return Object.assign(params, {
        [hash]: null
      });
    }

    const key = hash.slice(0, split);
    const val = hash.slice(split + 1);

    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
};

@inject('signUpStore')
@observer
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const params = decodeURLParams(this.props.location.search);
    this.props.signUpStore.initialize(params.email);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.signUpStore.isSignUpFailed) {
      this.props.enqueueSnackbar('회원 가입에 실패하였습니다.', {
        variant: 'error',
      });
      this.props.signUpStore.clearState();
    }

    if (this.props.signUpStore.isNotAvailableEmail) {
      this.props.enqueueSnackbar('이미 회원 가입된 이메일 입니다.', {
        variant: 'error',
      });

      this.props.signUpStore.clearState();
    }
  }

  handleChangeEmail = e => {
    this.props.signUpStore.changeNewUserEmail(e.target.value);
  }

  handleChangePassword = e => {
    this.props.signUpStore.changeNewUserPassword(e.target.value);
  }

  handleChangePasswordConfirm = e => {
    this.props.signUpStore.changeNewUserPasswordConfirm(e.target.value);
  }

  handleChangeUserName = e => {
    this.props.signUpStore.changeNewUserUserName(e.target.value);
  }

  handleChangeAllAgreements = e => {
    this.props.signUpStore.changeAgreementsAll(e.target.checked);
  }

  handleChangeServiceAgreements = e => {
    this.props.signUpStore.changeAgreementsService(e.target.checked);
  }

  handleChangePrivacyAgreements = e => {
    this.props.signUpStore.changeAgreementsPrivacy(e.target.checked);
  }

  handleClickOK = () => {
    this.props.signUpStore.doSignUp();
  }

  handleClickToHome = () => {
    this.props.history.push('/');
  }

  render () {
    const { classes } = this.props;
    const { canSignUp, isEmailInputed, isValidPassword, isPasswordConfirmed, isValidUserName, isPending, isSignUpSuccess, newUser, agreements } = this.props.signUpStore;
    return (
      <>
        <Container component="main" maxWidth="sm">
          <div className={classes.appBarSpacer} />
          <div className={classes.paper}>
            <img src={"/images/logo.png"} alt={""} />
            {!isSignUpSuccess ? (
              <div className={classes.mainContent}>
                <Typography className={classes.mainTitle} component="h1" variant="h3">
                  회원가입
                </Typography>

                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body2" className={classes.mainComment}>* 필수입력</Typography>
                  </Grid>
                </Grid>

                <TextField  id="email"
                            name="email"
                            label="이메일 주소"
                            margin="dense"
                            value={newUser.email}
                            onChange={this.handleChangeEmail}
                            className={classes.gutterMargin}
                            InputLabelProps={{shrink: true}}
                            // helperText={isValidEmail ? '' : '이메일 형식이 아닙니다.'}
                            autoFocus={isEmailInputed ? false : true}
                            required fullWidth />

                <TextField  id="password"
                            type="password"
                            name="password"
                            label="비밀번호"
                            margin="dense"
                            autoComplete={"off"}
                            value={newUser.password}
                            onChange={this.handleChangePassword}
                            className={classes.gutterMargin}
                            InputLabelProps={{shrink: true}}
                            helperText={isValidPassword ? '' : '최소 4 글자 이상을 입력해 주세요.'}
                            autoFocus={isEmailInputed ? true : false}
                            required fullWidth />

                <TextField  id="passwordConfirm"
                            type="password"
                            name="passwordConfirm"
                            label="비밀번호 확인"
                            margin="dense"
                            autoComplete={"off"}
                            value={newUser.passwordConfirm}
                            onChange={this.handleChangePasswordConfirm}
                            className={classes.gutterMargin}
                            InputLabelProps={{shrink: true}}
                            helperText={isPasswordConfirmed ? '' : '패스워드가 일치하지 않습니다.'}
                            required fullWidth />

                <TextField  id="name"
                            name="name"
                            label="이름"
                            margin="dense"
                            value={newUser.userName}
                            onChange={this.handleChangeUserName}
                            className={classes.gutterMargin}
                            InputLabelProps={{shrink: true}}
                            helperText={isValidUserName ? '' : '최소 2 글자 이상을 입력해 주세요.'}
                            required fullWidth />

                <div className={classes.titleArea}>
                  <Typography variant="h5" component="h5">약관동의</Typography>
                  <FormControlLabel variant="body2"
                                    name="checkAgreeTotal"
                                    style={{paddingLeft: 9}}
                                    control={
                                      <Checkbox checked={agreements.all}
                                                onChange={this.handleChangeAllAgreements}
                                                color="primary"
                                                className={classes.checkAgreeTotal} />
                                    }
                                    label="전체동의" />
                </div>

                <Grid item xs={12} style={{display: 'flex'}}>
                  <Grid item xs>
                    <FormControlLabel name="checkAgreeService"
                                      control={
                                        <Checkbox checked={agreements.service}
                                                  onChange={this.handleChangeServiceAgreements}
                                                  color="primary" />
                                      }
                                      label="서비스 이용 약관" />
                  </Grid>
                  <Grid item xs align="right">
                    <Link underline="always" href="/terms/terms" className={classes.termsCaption}>내용보기</Link>
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{display: 'flex'}}>
                  <Grid item xs>
                    <FormControlLabel name="checkAgreePersonal"
                                      control={
                                        <Checkbox checked={agreements.privacy}
                                                  onChange={this.handleChangePrivacyAgreements}
                                                  color="primary" />
                                      }
                                      label="개인 정보 처리 방침" />
                  </Grid>
                  <Grid item xs align="right">
                    <Link underline="always" href="/terms/privacy" className={classes.termsCaption}>내용보기</Link>
                  </Grid>
                </Grid>

                <Grid item xs={12} align="center">
                  <Button color="primary" variant="contained" className={classes.okButton}
                          disabled={(!canSignUp) || (isPending)}
                          onClick={this.handleClickOK}
                          fullWidth>
                    {isPending ? <CircularProgress size={16} /> : '회원 가입'}
                  </Button>
                </Grid>
              </div>
            ) : (
              <>
              </>
            )}

            {isSignUpSuccess ? (
              <div className={classes.successContainer}>
                <Typography className={classes.successTitle}>회원 가입 완료</Typography>
                <Typography className={classes.successHeader}>{`${newuser.email}로 전송된 이메일을 확인하여`}</Typography>
                <Typography className={classes.successHeader2}>가입절차를 완료해 주세요.</Typography>
                <Typography classname={classes.successBody}>이메일인증 완료 후에 서비스를<br/> 이용하실 수 있습니다.</Typography>
                <Button color="primary" variant="contained"
                        className={classes.successButton}
                        onClick={() => this.handleClickToHome()}>
                  메인으로 가기
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </>
    )
  }
}

export default withSnackbar(withRouter(withStyles(styles) (Signup)));