import person from '../../../../public/images/person.svg';

export const source = `
{{#if avatar}}
<div class="chats__chat-img"><img class="chats__chat-img" 
src='{{avatar}}'/></div>
  {{else}}
  <div class="chats__chat-img"><img class="chats__chat-img" src=${person} /></div>
  {{/if}}
    <div class="chats__chat-main-block">
        <div class="chats__chat-info-block">
            <div class="chats__chat-info-name">{{title}}</div>
            <div class="chats__chat-time"></div>
        </div>
    <div class="chats__chat-info-block">
    <div class="chats__chat-message"></div>
       <div class="chats__chat-message-count"></div>
      </div>
    </div>`;
