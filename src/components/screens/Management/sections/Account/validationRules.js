import { matches, notEmpty, emailFormat } from '@dprovodnikov/validation';

export const adminAccountFormRules = {
  email: [
    notEmpty('Email should not be empty'),
    emailFormat('Email format is invalid'),
  ],
  password: [
    notEmpty('Password should not be empty'),
  ],
  confirmPassword: [
    notEmpty('You should confirm password'),
    matches('password', 'Passwords do not match'),
  ],
};

export const sessionStorageFormRules = {
  sessionDuration: [
    notEmpty('You have to specify session duration (in seconds).'),
  ],
  address: [
    notEmpty('You have to specify address'),
  ],
  password: [
    notEmpty('You have to specify password'),
  ],
  db: [
    notEmpty('You have to specify db'),
  ],
  region: [
    notEmpty('You have to specify region'),
  ],
  endpoint: [
    notEmpty('You have to specify endpoint'),
  ],
};
