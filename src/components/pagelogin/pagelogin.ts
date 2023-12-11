import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  title: Block,
  form: Block,
  question: Block
}

export class PageLogin extends Block {
  constructor(props: Props) {
    super('main', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
