export const source = /*<section class="user">*/
`{{{backPanel}}}
<div class="user__register-form-block">
  {{{userFoto }}}
  {{{userName }}}

  {{{userForm }}}

  <div class="user__change-block">
  <a class="user__link" href="/src/pages/userUpdate/userUpdate.html">
    <p class="user__change">Изменить данные</p>
  </a>
  <a class="user__link" href="/src/pages/updatePassword/updatePassword.html">
    <p class="user__change">Изменить пароль</p>
  </a>
  <a class="user__link" href="/src/pages/login/login.html">
    <p class="user__change user__change-exit">Выйти</p>
  </a>
</div>
  

</div>` 

/*
  {{#userMainForm}}
  {{> inputDisabled/inputDisabled inputName="Почта" inputClass="email" type="email" inputValue=currentUser.email}}
  {{> inputDisabled/inputDisabled inputName="Логин" inputClass="login" type="text" inputValue=currentUser.login}}
  {{> inputDisabled/inputDisabled inputName="Имя" inputClass="first_name" type="text"
  inputValue=currentUser.first_name}}
  {{> inputDisabled/inputDisabled inputName="Фамилия" inputClass="second_name" type="text"
  inputValue=currentUser.second_name}}
  {{> inputDisabled/inputDisabled inputName="Имя в чате" inputClass="display_name" type="text"
  inputValue=currentUser.display_name}}
  {{> inputDisabled/inputDisabled inputName="Телефон" inputClass="phone" type="tel" inputValue=currentUser.phone}}
  {{/userMainForm}} */

