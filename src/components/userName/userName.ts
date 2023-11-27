import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  attr: Record<string, string>,
  name: string
}

export default class UserName extends Block {
  constructor(props: Props) {
    super('p', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
