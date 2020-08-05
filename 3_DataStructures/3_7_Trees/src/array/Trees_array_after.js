class BinaryTree {
  constructor(array) {
    this.array = array;
  }
  /* 1/3. node->left->right */
  preorder() {
    let s = "";
    const array = this.array; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    function recursive(index) {
      if (index >= array.length) {
        // array.length = 13 -> index는 13부터 return임
        return;
      }

      s += `${array[index]} `; // parent
      recursive(index * 2 + 1); // left
      recursive(index * 2 + 2); // right
    }

    recursive(0);
    console.log("preorder", s); // 0 1 3 7 8 4 9 10 2 5 11 12 6
  }
  /* 2/3. left->node->right */
  inorder() {
    let s = "";
    const array = this.array;

    function recursive(index) {
      if (index >= array.length) {
        return;
      }

      recursive(index * 2 + 1);
      s += `${array[index]} `;
      recursive(index * 2 + 2);
    }

    recursive(0);
    console.log("inorder", s); // 7 3 8 1 9 4 10 0 11 5 12 2 6
  }
  /* 3/3. left->right->node */
  postorder() {
    let s = "";
    const array = this.array;

    function recursive(index) {
      if (index >= array.length) {
        return;
      }

      recursive(index * 2 + 1);
      recursive(index * 2 + 2);
      s += `${array[index]} `;
    }

    recursive(0);
    console.log("postorder", s); // 7 8 3 9 10 4 1 11 12 5 6 2 0
  }
  /* 왼쪽, 위쪽에 있는 것부터 탐색 */
  bfs(value) {
    for (let [idx, el] of this.array.entries()) {
      console.log("tree.bfs(6)", el); // 1->2->3->4->5->6
      if (el === value) {
        return idx;
      }
    }
    return false;
  }
  /* node->left->right */
  dfs(value) {
    let isFound = false;
    let foundValue = false;
    const array = this.array;

    function recursive(index) {
      if (index >= array.length || isFound === true) {
        return;
      }

      if (array[index] === value) {
        isFound = true;
        foundValue = index;
        return;
      }

      recursive(index * 2 + 1);
      recursive(index * 2 + 2);
    }

    recursive(0);
    return foundValue;
  }
}

// tree = new BinaryTree([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
tree = new BinaryTree([0, 1, 2, 3, 4]);
tree.preorder();
tree.inorder();
tree.postorder();

console.log(tree.dfs(15));
console.log(tree.dfs(11));

console.log(tree.bfs(6));
console.log(tree.bfs(17));
