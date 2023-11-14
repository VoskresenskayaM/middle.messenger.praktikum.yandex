import Block from "../../utils/Block";
import { source } from "./source";

export default class ChatLink extends Block {
  constructor(props) {
    super("div", props);
  }
  render(){
   
    return this.compile(source)
  }
} 