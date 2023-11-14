import Block from "../../utils/Block";
import { source } from "./source";

export default class UserPasswordUpdate extends Block {
 constructor( props) {
      super("section", props);
    }
    render() {
        return this.compile(source)
    }
} 