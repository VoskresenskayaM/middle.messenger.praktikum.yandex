import '../../css/style.scss';

import { render } from '../../utils/renderDOM'

import FormTitle from '../../components/formTitle/formTitle';
import ButtonTest from '../../components/test_sprint_2_button/ButtonTest';
import RegForm from '../../components/regForm/regForm';
import InputReg from '../../components/inputReg/inputReg'

/*const title = new FormTitle({
    title: "Вход",
    className: "login__form-title",
});
render(".login__form-block", title);*/
const input = new InputReg({
    label: "Логин",
    type: "text",
    inputName: "login",
    attr: {
        class: "login__input-block"
    }
})

const form = new RegForm({
   input1: input,
    attr: {
        class: "login__form"
    }
})

/*input1: new InputReg({
    label: "Логин",
    type: "text",
    inputName: "login"
}),
input2: new InputReg({
    label: "Пароль",
    type: "password",
    inputName: "password"
}),
button: new ButtonTest({
    text: "Сохранить",
    className: "user__form-button",
    type: "button",
    events: {
        click: event => {
            console.log('Надо вывести тут все поля формы');
        },
    }
})*/

console.log(form)
render(".login__form-block", form);
