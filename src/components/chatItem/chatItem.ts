import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  name: string,
  time: string,
  message: string,
  count: string,
}

export default class ChatItem extends Block {
  constructor(props : Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
