import Block from "../../utils/Block";
import { source } from "./source";

export default class ChatItem extends Block {
  constructor(props) {
    super("div", props);
  }
  render(){
    return this.compile(source, this.props)
  }
} 