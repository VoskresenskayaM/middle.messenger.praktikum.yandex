type Sets = Record<string, string>;
type elem = HTMLElement;
type inputArr = HTMLInputElement[];
type inputEl = HTMLInputElement;

export default class FormValidator {
  _settings : Sets | null;

  _form : elem |null;

  _inputArr: inputArr | null = [];

  _button: elem | null;

  constructor(settings: Sets) {
    this._settings = settings;
    this._form = document.querySelector(this._settings.formSelector);
    /* this._inputs = this._form.querySelectorAll(this._settings.inputSelector); */
    this._inputArr = Array.from(document.querySelectorAll('input'));
    this._button = document.querySelector(this._settings.buttonSelector);
  }

  private _inputCheck(el:inputEl) {
    const inputValue = el.value;
    const inputReg = el.getAttribute('data-reg') as string;
    const reg = new RegExp(inputReg);
    const { name } = el;
    if (!this._form || !this._settings) return;
    const errorSpan = this._form.querySelector(`${this._settings.spanError}-${name}`);
    if (!errorSpan) return;
    if (!reg.test(inputValue)) {
      errorSpan.classList.add(this._settings.inputActinSelector);
      el.focus();
    } else errorSpan.classList.remove(this._settings.inputActinSelector);
  }

  private _hasInvalidInput() : boolean {
    return this._inputArr ? this._inputArr.some((input) => {
      const inputReg = input.getAttribute('data-reg');
      if (!inputReg) return true;
      const reg = new RegExp(inputReg);
      return !reg.test(input.value);
    }) : true;
  }

  private _toggleButtonState = () => {
    if (!this._button || !this._settings) return;
    if (this._hasInvalidInput()) {
      this._button.setAttribute('disabled', '');
      this._button.classList.add(this._settings.buttonInactivSelector);
    } else {
      this._button.classList.remove(this._settings.buttonInactivSelector);
      this._button.removeAttribute('disabled');
    }
  };

  private _setEventListeners = () => {
    this._toggleButtonState();
    if (!this._inputArr) return;
    this._inputArr.forEach((input) => {
      input.addEventListener('blur', () => {
        this._inputCheck(input);
        this._toggleButtonState();
      });
      input.addEventListener('focus', () => {
        this._inputCheck(input);
        this._toggleButtonState();
      });
    });
  };

  public enableValidation = () => {
    this._setEventListeners();
  };
}
