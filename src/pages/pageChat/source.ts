import clip from '../../../public/images/clip.svg';

export const source = `
<div class="chats">
    {{{profileLink}}}
    {{{chatForm}}}
    {{{chatList}}}
    {{{addChatForm}}}
 </div>
{{#if activeChatId}}
<div class="feed__messages">
    {{{chatHeader}}}
    <div class="feed__all">
        <div class="feed__all-date">19 октября</div>
        {{{messagesList}}}
    </div>
    <div class="feed__footer">
        <img class="feed__form-icon" src=${clip} />
        {{{chatSendForm}}}
    </div>
    <div class="chat__users_actions">
    {{{addUserForm}}}
    {{{button}}}
    </div>
</div>
{{else}}
<div class="feed__messages">
<div class="feed">
    <p class="feed__not_chats">Выберите чат чтобы отправить сообщение</p>
    </div>
</div>
{{/if}}`;
