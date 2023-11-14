import Block from "../utils/Block.js";

export function render(query: string, block: Block)  {
    const root = document.querySelector(query);
    if(!root) return
    root.appendChild(block.getContent()); 
    block.dispatchComponentDidMount();
    return root;
  } 