const BASE_URL = 'https://ya-praktikum.tech/api/v2';
const CHATS_URL = 'wss://ya-praktikum.tech/ws/chats';

const regFormSettings = {
  formSelector: '.login__form',
  buttonSelector: '.user__form-button',
  buttonInactivSelector: 'user__form-button_inactiv',
  inputSelector: '.login-input',
  inputActinSelector: 'login__input-error-active',
  spanError: '.login__input-error',
};

const userFormSettings = {
  formSelector: '.user__info-form',
  buttonSelector: '.user__form-button',
  buttonInactivSelector: 'user__form-button_inactiv',
  inputSelector: '.user-input',
  inputActinSelector: 'user__input-error-active',
  spanError: '.user__input-error',
};

const formErrorReg = {
  email: '^\\S+@\\S+\\.\\S+$',
  password: '^(?=.*[A-Z])(?=.*\\d)[\\d\\D]{8,40}$',
  first_name: '^(?=[A-ZА-Я])[A-Za-zА-Яа-я-]*$',
  second_name: '^(?=[A-ZА-Я])[A-Za-zА-Яа-я-]*$',
  login: '^(?=[A-Za-z0-9-_])(?=.*\\D)[A-Za-z0-9-_]{3,20}$',
  phone: '^((8|\\+7)[\\-\\s]?)?(\\(?\\d{3}\\)?[\\-\\s]?)?[\\d\\-\\s]{7,10}$',
  message: '\\w+$',
  file: '^[A-Za-z]{1,8}\\.[A-Za-z]{1,3}$',
};

const formErrorMessage = {
  emailError: 'неверный формат почты',
  passwordError: 'неверный формат пароля',
  nameError: 'неверный формат имени',
  phoneError: 'неверный формат телефона',
  fileError: 'неверный формат файла',
};

const currentUser = {
  login: 'ivanivanov',
  email: 'pochta@yandex.ru',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'Иван',
  phone: '+7(909)-967-30-30',
};

const ROUTES = {
  CHAT: '/messenger',
  SIGNIN: '/',
  SIGNUP: '/sign-up',
  PROFILE: '/profile',
  PROFILE_EDIT_DATA: '/settings',
  PROFILE_EDIT_PASSWORD: '/edit-password',
  ERROR: '/error',
  NOT_FOUND: '/404',
};

export {
  BASE_URL,
  CHATS_URL,
  regFormSettings,
  formErrorReg,
  formErrorMessage,
  currentUser,
  userFormSettings,
  ROUTES,
};
