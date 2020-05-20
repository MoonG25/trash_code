import { action, computed, flow, observable, toJS } from 'mobx';
import axios from 'axios';

const MinUserName = 2;
const MinPassword = 4;

const State = {
  Ready: 'Ready',
  Pending: 'Pending',
  NotAvailableEmail: 'NotAvailableEmail',
  Success: 'Success',
  Fail: 'Fail',
};

const EmptyNewUser = {
  email: '',
  password: '',
  passwordConfirm: '',
  userName: '',
};

const EmptyAgreements = {
  all: false,
  service: false,
  privacy: false,
};

export default class SignUpStore {
  @observable state = State.Ready;
  @observable newUser = {...EmptyNewUser}
  @observable agreements = {...EmptyAgreements}

  @action initialize = (email) => {
    this.state = State.Ready;
    this.newUser = {...EmptyNewUser}

    if (email) {
      this.newUser.email = email;
    }
  }

  @action clearState = () => {
    this.state = State.Ready;
  }

  @action changeNewUserEmail = (email) => {
    this.newUser.email = email;
  }

  @action changeNewUserPassword = (password) => {
    this.newUser.password = password;
  }

  @action changeNewUserPasswordConfirm = (passwordConfirm) => {
    this.newUser.passwordConfirm = passwordConfirm;
  }

  @action changeNewUserUserName = (userName) => {
    this.newUser.userName = userName;
  }

  @action changeAgreementsAll = (allAgreements) => {
    if (allAgreements) {
      this.agreements.all = true;
      this.agreements.service = true;
      this.agreements.privacy = true;
    } else {
      this.agreements.all = false;
      this.agreements.service = false;
      this.agreements.privacy = false;
    }
  }

  @action changeAgreementsService = (serviceAgreements) => {
    if (serviceAgreements) {
      this.agreements.service = true;
    } else {
      this.agreements.all = false;
      this.agreements.service = false;
    }
  }

  @action changeAgreementsPrivacy = (privacyAgreements) => {
    if (privacyAgreements) {
      this.agreements.privacy = true;
    } else {
      this.agreements.all = false;
      this.agreements.privacy = false;
    }
  }

  @computed get isEmailInputed() {
    return ((this.newUser.email !== undefined) && (this.newUser.email !== null) && (this.newUser.email.length > 0));
  }

  @computed get canSignUp() {
    const agreements = this.agreements.service && this.agreements.privacy;
    const passwordConfirm = this.newUser.password === this.newUser.passwordConfirm;
    const password = this.newUser.password.length >= MinPassword;
    const userName = this.newUser.userName.length >= MinUserName;

    return ((agreements && passwordConfirm) && (password && userName));
  }

  @computed get isValidPassword() {
    return this.newUser.password.length >= MinPassword;
  }

  @computed get isPasswordConfirmed() {
    return this.newUser.password === this.newUser.passwordConfirm;
  }

  @computed get isValidUserName() {
    return this.newUser.userName.length >= MinUserName;
  }

  @computed get isPending() {
    return this.state === State.Pending;
  }

  @computed get isSignUpSuccess() {
    return this.state === State.Success;
  }

  @computed get isSignUpFailed() {
    return this.state === State.Fail;
  }

  @computed get isNotAvailableEmail() {
    return this.state === State.NotAvailableEmail;
  }

  doSignUp = flow(function* doSignUp() {
    this.state = State.Pending;

    try {
      const response = yield axios.get(`/api/v1/users/signupcheck?email=${this.newUser.email}`);
      const isNotAvailEmail = response.data.result;

      if (!isNotAvailEmail) {
        const param = toJS(this.newUser);
        delete param.passwordConfirm;

        yield axios.post('/api/v1/users/signup', param);

        this.state = State.Success;
      } else {
        this.state = State.NotAvailableEmail;
      }
    } catch (e) {
      this.state = State.Fail;
    }
  });
}