import Block from "../../utils/Block";
import { source } from "./source";

export default class RegFormQuestion extends Block {
  constructor(props) {
    super("a", props);
  }
  render(){
   
    return this.compile(source)
  }
} 