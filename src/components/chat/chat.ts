import Block from '../../utils/Block';
import { source } from './source';

interface Props {
    attr: Record<string, string>,
    chat : Block,
    feed: Block
  }

export default class Chat extends Block {
  constructor(props : Props) {
    super('section', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
