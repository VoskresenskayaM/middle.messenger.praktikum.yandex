export const source = `{{#if isYouMasssage}}
            <div class="feed__contact-message">
                <p class="feed__contact-message-text">{{content}}</p>
            </div>
            {{else}}
            <div class="feed__you-message">
                <p class="feed__you-message-text">{{content}}</p>
            </div>
            {{/if}}`;
