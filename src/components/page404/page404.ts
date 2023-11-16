import Block from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  error: string,
  message: string,
  link: string
}

export default class Page404 extends Block {
  constructor(props: Props) {
    super('section', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
