import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>
}

export default class NotUserFoto extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
