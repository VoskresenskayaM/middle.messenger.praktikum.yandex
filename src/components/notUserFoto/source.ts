export const source = `<div class="user__not-foto-background">
{{#if avatar}}
    <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="Аватар" class="avatar-profile__image">
    {{else}}
    <img class="user__not-foto" alt="Заглушка" src="/static/images/not_foto.svg">
    {{/if}}
</div>
<div class="user__change-foto">
    <p class="user__change-text">Поменять аватар</p>
</div>`;
