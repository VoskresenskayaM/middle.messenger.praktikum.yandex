import { Block } from '../../../utils/Block';
import { source } from './source';

  interface Props {
    attr: Record<string, string>,
    chatLink: Block,
    chatForm: Block,
    chatsArr: Block
  }

export default class Chats extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
