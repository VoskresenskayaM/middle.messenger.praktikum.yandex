import { Block } from '../utils/Block';
import { render } from '../utils/renderDOM';
import { Props } from '../utils/Types';

function isEqual(lhs : string, rhs: string): boolean {
  return lhs === rhs;
}
export interface BlockConstructable<P extends object = any> {
  new (props: P): Block<P>;
}

export class Route {
  private _pathname : string;

  private _props: string;

  private _block : Block | null = null;

  public _blockClass: BlockConstructable;

  constructor(pathname : string, view: BlockConstructable, props: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  /*navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }*/

  leave() {
    if (this._block) {
      /*this._block.hide();*/
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      render(this._props, this._block);
    }
  }
}
