import Block from "../../utils/Block";
import { source } from "./source";

export default class formTitle extends Block {
  constructor(props) {
    super("p", props);
  }
  render(){
    return this.compile(source, this.props)
  }
} 