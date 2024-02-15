import { Block } from '../../../utils/Block';
import { source } from './source';

export class ChatHeaderItem extends Block {
  render() {
    return this.compile(source, this._props);
  }
}
