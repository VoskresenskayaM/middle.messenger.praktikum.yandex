import { Block } from '../../utils/Block';
import { source } from './source';

interface Props{
text: string,
attr: Record<string, string>
}
export default class RegFormQuestion extends Block {
  constructor(props:Props) {
    super('a', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
