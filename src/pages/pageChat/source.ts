export const source = `
<div class="chats">
    {{{profileLink}}}
    {{{chatForm}}}
    {{{chatList}}}
    {{{addChatForm}}}
</div>
{{#if activeChatId}}
<div class="feed__messages">


 <div class="feed__contact">
        <div class="feed__contact-about">
            <div class="feed__contact-img"><img src="" /></div>
            <p class="feed__contact-name">Вадим</p>
        </div>
        <img src="/static/images/contactMore.svg" class="feed__contact-more">
    </div>
    {{{chatHeader}}}

    <div class="feed__all">
        <div class="feed__all-date">19 октября</div>
        <div class="feed__all-messages">
            <div class="feed__contact-message">
                <p class="feed__contact-message-text">Привет! Смотри, тут всплыл интересный кусок лунной космической
                    истории
                    — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.
                    Сейчас
                    мы все знаем что астронавты летал</p>
            </div>
            <div class="feed__you-message">
                <p class="feed__you-message-text">Круто!</p>
            </div>
        </div>

    </div>

    <div class="feed__footer">
        <img class="feed__form-icon" src="/static/images/clip.svg" />
        <form class="feed__form">
            <input type="text" placeholder="Сообщение" name="search" class="feed__form-input">
            <button class="feed__form-submit" type="submit"><img src="/static/images/find.svg" /></button>
        </form>
    </div>
</div>
{{else}}
<div class="feed__messages">
<div class="feed">
    <p class="feed__not_chats">Выберите чат чтобы отправить сообщение</p>
    </div>
</div>
{{/if}}`