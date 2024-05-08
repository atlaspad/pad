const Tree = require("./index.js");

class Memory {
  constructor(data) {
    this.data = data;
    this.treeClass;
    this.buildTree();
  }

  buildTree() {
    this.treeClass = new Tree(this.data);
  }

  addData(data) {
    this.data.push(data);
    this.buildTree();
  }

  verify(proof, leaf) {
    return this.treeClass.verify(
      proof,
      leaf,
      this.treeClass.tree.getRoot().toString("hex")
    );
  }
}

module.exports = Memory;
