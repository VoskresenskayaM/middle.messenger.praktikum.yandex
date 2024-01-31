import { Block } from '../../../utils/Block';
import { source } from './source';
import { ChatHeaderArrConnect } from '../chatHeaderArr/chatHeaderArr';

export class ChatHeader extends Block {
  init() {
    this._children.userList = new ChatHeaderArrConnect('div', {
      attr: { class: 'feed__contact-about' },
    });
  }

  render() {
    return this.compile(source, this._props);
  }
}
