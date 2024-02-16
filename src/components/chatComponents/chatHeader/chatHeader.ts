import { Block } from '../../../utils/Block';
import { source } from './source';
import { ChatHeaderArrConnect } from '../chatHeaderArr/chatHeaderArr';
import ButtonTest from '../../test_sprint_2_button/ButtonTest';
import { StoreState, connect } from '../../../utils/Store';
import { chatController } from '../../../controllers/ChatController';

export class ChatHeader extends Block {
  init() {
    this._children.userList = new ChatHeaderArrConnect('div', {
      attr: { class: 'feed__contact-about' },
    });
    this._children.deleteUser = new ButtonTest({
      text: 'Удалить пользователя?',
      attr: {
        class: 'user__delete-button',
        type: 'button',
      },
      events: {
        click: async () => {
          const button = document.querySelector('.user__delete-button') as Element;
          if (!button) return;
          if (this._props.deleteUserId === this._props.user.id) {
            // eslint-disable-next-line no-alert
            alert('Этот пользователь создал чат, его нельзя удалить');
            button.classList.remove('user__delete-button_active');
            button.setAttribute('disabled', 'disabled');
            return;
          }
          const data = { users: [this._props.deleteUserId], chatId: this._props.chatId };
          await chatController.removeUserFromChat(data);
          button.classList.remove('user__delete-button_active');
          button.setAttribute('disabled', 'disabled');
        },
      },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}

function mapStateToProps(state: StoreState) {
  return {
    chatUsers: state.chatUsers,
    chatId: state.activeChatId,
    deleteUserId: state.deleteUserId,
    user: state.user,
  };
}
export const ChatHeaderConnect = connect(mapStateToProps)(ChatHeader);
