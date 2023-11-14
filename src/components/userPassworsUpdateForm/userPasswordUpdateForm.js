import Block from "../../utils/Block";
import { source } from "./source";

export default class userPasswordUpdateForm extends Block {
 constructor( props) {
      super("form", props);
    }
    render() {
        return this.compile(source)
    }
} 