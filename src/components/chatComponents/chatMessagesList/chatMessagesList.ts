import { Block } from '../../../utils/Block';
import { StoreState, connect } from '../../../utils/Store';
import { Props, Message } from '../../../utils/Types';
import { ChatMessageItem } from '../chatMessageItem/chatMessageItem';

class ChatMessagesList extends Block {
  init() {
    this._lists.items = this._lists.messages.map((el : Message) => new ChatMessageItem('div', {
      attr: {
        class: 'feed__contact-about',
      },
      ...el,

    }));
  }

  public setProps(nextProps: Props) {
    if ('messages' in nextProps) {
      // eslint-disable-next-line no-param-reassign
      nextProps.items = nextProps.messages.map((el : Message) => new ChatMessageItem('div', {
        attr: {
          class: 'feed__contact-about',
        },
        ...el,
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
    messages: state.messages,
  };
}
export const ChatMessagesListConnect = connect(mapStateToProps)(ChatMessagesList);
