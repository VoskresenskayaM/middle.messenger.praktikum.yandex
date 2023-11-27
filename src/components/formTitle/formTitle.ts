import { Block } from '../../utils/Block';
import { source } from './source';

interface Props {
  title: string,
className: string,
}

export default class FormTitle extends Block {
  constructor(props: Props) {
    super('p', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
