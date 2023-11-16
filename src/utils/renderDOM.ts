import Block from './Block.ts';

export function render(query: string, block: Block) : Element | null {
  const root = document.querySelector(query);
  const blockContent = block.getContent();
  if (root && blockContent) {
    root.appendChild(blockContent);
    block.dispatchComponentDidMount();
  }
  return root;
}
