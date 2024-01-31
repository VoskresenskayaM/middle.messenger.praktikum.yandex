import { ChatsUser } from '../../../api/ChatApi';
import { Block } from '../../../utils/Block';
import { StoreState, connect } from '../../../utils/Store';
import { Props } from '../../../utils/Types';
import { ChatHeaderItem } from '../chatHeaderItem/chatHeaderItem';

class ChatHeaderArr extends Block {
  init() {
    this._lists.items = this._lists.chatUsers.map((el : ChatsUser) => new ChatHeaderItem('div', {
      attr: {
        class: 'feed__contact-about',
      },
      avatar: el.avatar,
      name: el.first_name,

    }));
  }

  public setProps(nextProps: Props) {
    if ('chatUsers' in nextProps) {
      // eslint-disable-next-line no-param-reassign
      nextProps.items = nextProps.chatUsers.map((el : ChatsUser) => new ChatHeaderItem('div', {
        attr: {
          class: 'feed__contact-about',
        },
        avatar: el.avatar,
        name: el.first_name,
      }));
    }
    super.setProps(nextProps);
  }

  render() {
    return this.compile('{{{items}}}', this._props);
  }
}

function mapStateToProps(state: StoreState) {
  return {
    chatUsers: state.chatUsers,
  };
}
export const ChatHeaderArrConnect = connect(mapStateToProps)(ChatHeaderArr);
