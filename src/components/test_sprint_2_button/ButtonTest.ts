import { Block } from '../../utils/Block';
import { source } from './source';

type buttonHendle=(event: Event) => void;
interface Props {
  attr: Record<string, string>,
  text: string,
  events: Record<string, buttonHendle>
}

export default class ButtonTest extends Block {
  constructor(props: Props) {
    super('button', props);
  }

  render() {
    /* const source = '{{text}}'; */
    return this.compile(source, this._props);
  }
}

/* const mapStateToProps = (state: StoreState) => ({ ...state });
export const PageLoginConnect = connect(mapStateToProps)(PageLogin); */
