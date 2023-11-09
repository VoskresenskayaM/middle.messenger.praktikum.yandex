import Block from "../../utils/Block";

export default class ButtonTest extends Block {
  constructor(props) {
    super("button", props);
  }
  render(){
    const source= `{{text}}`;
    return this.compile(source)
  }

} 

