export default class FormValidator {
constructor(settings) {
    this._settings = settings;
    this._form = document.querySelector(this._settings.formSelector);
    this._inputs = this._form.querySelectorAll(this._settings.inputSelector)
    this._inputArr = Array.from(this._form.querySelectorAll('input'));
    this._button = this._form.querySelector(this._settings.buttonSelector);
}

_inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg)
    const name = el.name;
   
    const errorSpan = this._form.querySelector(`${this._settings.spanError}-${name}`)
    if (!reg.test(inputValue)) {
        errorSpan.classList.add(this._settings.inputActinSelector)
        el.focus();
    }
    else errorSpan.classList.remove(this._settings.inputActinSelector)
}

_hasInvalidInput = () => {
    return this._inputArr.some((input) => {
        const inputReg = input.getAttribute("data-reg");
        const reg = new RegExp(inputReg)
        return !reg.test(input.value);
    });
};

_toggleButtonState = () => {
    if (this._hasInvalidInput()){
        this._button.setAttribute('disabled', true);
        this._button.classList.add(this._settings.buttonInactivSelector);
    }
    else {
        this._button.classList.remove(this._settings.buttonInactivSelector);
        this._button.removeAttribute('disabled', false);
    }
}

_setEventListeners = () => {
    this._toggleButtonState();
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
}
enableValidation = () => {
    this._setEventListeners();
}

}