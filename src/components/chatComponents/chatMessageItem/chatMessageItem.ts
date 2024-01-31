import { Block } from '../../../utils/Block';
import { store } from '../../../utils/Store';
import { source } from './source';

export class ChatMessageItem extends Block {
  render() {
    const { user } = store.getState();
    this._props = {
      ...this._props,
      isYouMasssage: this._props.user_id === user?.id,
    };
    return this.compile(source, this._props);
  }
}
