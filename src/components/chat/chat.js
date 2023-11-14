import Block from "../../utils/Block";
import { source } from "./source";

export default class Chat extends Block {
  constructor(props) {
    super("section", props);
  }
  render(){
    return this.compile(source, this.props)
  }
} 