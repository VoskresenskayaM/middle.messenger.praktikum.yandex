import Block from "../../utils/Block";
import { source } from "./source";

export default class UserInputDisabled extends Block {
 constructor( props) {
      super("div", props);
    }
    render() {
        return this.compile(source)
    }
} 