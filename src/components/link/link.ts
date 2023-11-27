import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  title: string,
  href: string
}

export default class Link extends Block {
  constructor(props: Props) {
    super('li', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
