import { Block } from '../../utils/Block';
import { source } from './source';

type buttonHendle=(event: Event) => void;
interface Props {
    attr: Record<string, string>,
    text: string,
    events?: Record<string, buttonHendle>
  }

export  class ProfileLink extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(source, this._props);
  }
}
