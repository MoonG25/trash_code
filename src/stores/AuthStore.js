import { action, computed, flow, observable, toJS } from 'mobx';
import axios from 'axios';

export const State = {
  Authenticated: 'Authenticated',
  NotAuthenticated: 'NotAuthenticated',
  Pending: 'Pending',
  Failed: 'Failed',
};

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
  
  // checkLogin = flow(function* checkLogin() {
  //   const token = localStorage.getItem(LocalStorageTokenKey);

  //   if (token) {
  //     try {
        
  //     } catch (e) {
  //       this.loginState = State.NotAuthenticated;
  //       this.loginToken = '';
  //       this.loginUser = Object.assign({}, EmptyUser);
  //     }
  //   }
  // });
}