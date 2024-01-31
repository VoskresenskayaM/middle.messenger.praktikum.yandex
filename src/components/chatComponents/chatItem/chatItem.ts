import { Block } from '../../../utils/Block';
import { source } from './source';

export class ChatItem extends Block {
  render() {
    return this.compile(source, this._props);
  }
}
