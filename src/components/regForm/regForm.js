import Block from "../../utils/Block";
import { source } from "./source";

export default class RegForm extends Block {
 constructor( props) {
      super("form", props);
    }
    render() {
        return this.compile(source)
    }
} 