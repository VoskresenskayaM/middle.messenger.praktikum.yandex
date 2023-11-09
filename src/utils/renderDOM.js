
export function render(query, block) {
    const root = document.querySelector(query);
console.log(block.getContent())
      // Можно завязаться на реализации вашего класса Block
    root.appendChild(block.getContent()); 

    block.dispatchComponentDidMount();
  
    return root;
  } 