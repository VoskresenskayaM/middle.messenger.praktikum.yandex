export const source = `
<div class="user__input-container">
<p class="user__input-name">{{inputName}}</p>
<input class="user__input user__input-{{inputClass}}" type={{type}} data-reg={{reg}} 
name={{inputClass}} value={{inputValue}}>
    </div>
    <span class="user__input-error user__input-error-{{inputClass}}">{{error}}</span>`;
