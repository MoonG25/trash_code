import { default as AuthStore } from './AuthStore';
import { default as SignUpStore } from './SignUpStore';

export const stores = {
  authStore: new AuthStore(),
  signUpStore: new SignUpStore(),
};