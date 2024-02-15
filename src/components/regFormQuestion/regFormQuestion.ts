import { Block } from '../../utils/Block';
import { source } from './source';

type buttonHendle=(event: Event) => void;
interface Props{
text: string,
attr: Record<string, string>,
events: Record<string, buttonHendle>
}
export default class RegFormQuestion extends Block {
  constructor(props:Props) {
    super('a', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
