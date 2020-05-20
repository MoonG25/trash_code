import { action, computed, flow, observable, toJS } from 'mobx';
import axios from 'axios';

export const State = {
  Authenticated: 'Authenticated',
  NotAuthenticated: 'NotAuthenticated',
  Pending: 'Pending',
  Failed: 'Failed',
};

export const LocalStorageTokenKey = '_AM_AUTHENTICATION_TOKEN_';
export const LocalStorageSaveIdKey = '_AM_AUTHENTICATION_SAVE_ID_';
export const LocalStorageSaveEmailKey = '_AM_AUTHENTICATION_EMAIL_';
export const LocalStorageSaveNameKey = '_AM_AUTHENTICATION_NAME_';

const EmptyLogin = {
  id: '',
  password: '',
};

const EmptyUser = {
  userId: 'guest',
  email: '',
  userName: '',
  createdDatetime: '',
  modifiedDatetime: '',
};

export default class AuthStore {
  @observable login = Object.assign({}, EmptyLogin);
  @observable saveId = false;
  @observable loginState = State.NotAuthenticated;
  @observable loginToken = '';
  @observable loginUser = Object.assign({}, EmptyUser);

  @computed get isLoggedIn() {
    return this.loginState === State.Authenticated;
  }

  @action checkLoginId = () => {
    const savedId = localStorage.getItem(LocalStorageSaveIdKey);

    if (savedId) {
      this.login.id = savedId;
      this.saveId = true;
    }
  }

  @action changeLoginId = (id) => {
    this.login.id = id;
  }

  @action changeLoginPassword = (password) => {
    this.login.password = password;
  }

  @action changeSaveId = (saveId) => {
    this.saveId = saveId;
  }

  doLogin = flow(function* doLogin() {
    this.loginStsate = State.Pending;

    if (this.saveId) {
      localStorage.setItem(LocalStorageSaveIdKey, this.login.id);
    } else {
      localStorage.setItem(LocalStorageSaveIdKey, '');
      localStorage.setItem(LocalStorageSaveEmailKey, '');
      localStorage.setItem(LocalStorageSaveNameKey, '');
    }

    try {
      const param = {
        email: this.login.id,
        password: this.login.password,
      };
      const response = yield axios.post('/api/v1/authentications/signin', param);
      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem(LocalStorageTokenKey, token);

      this.loginState = State.Authenticated;
      this.loginToken = token;
      this.loginUser = user;
    } catch (e) {
      this.loginState = State.Failed;
      this.loginToken = '';
      this.loginUser = Object.assign({}, EmptyUser);
    }
  });

  checkLogin = flow(function* checkLogin() {
    const token = localStorage.getItem(LocalStorageTokenKey);

    if (token) {
      try {
        const response = yield axios.get('/api/v1/authentications/signcheck');
        const user = response.data;

        this.loginState = State.Authenticated;
        this.loginUser = user;
      } catch (e) {
        this.loginState = State.NotAuthenticated;
        this.loginToken = '';
        this.loginUser = Object.assign({}, EmptyUser);
      }
    }
  });

  doLogout = flow(function* doLogout() {
    localStorage.removeItem(LocalStorageTokenKey);

    try {
      yield axios.post('/api/v1/authentications/signout');
      this.login = Object.assign({}, EmptyLogin);
      this.loginState = State.NotAuthenticated;
      this.loginToken = '';
      this.loginUser = Object.assign({}, EmptyUser);
    } catch (e) {
      this.login = Object.assign({}, EmptyLogin);
      this.loginState = State.NotAuthenticated;
      this.loginToken = '';
      this.loginUser = Object.assign({}, EmptyUser);
    }

    window.location.href = '/';
  })
}