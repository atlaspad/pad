const { MerkleTree } = require("merkletreejs");
const { Field, Poseidon } = require("o1js");

class Tree {
  constructor(data) {
    this.leaves = this.hashLeaves(data);
    this.tree = new MerkleTree(this.leaves, this.poseidonHash, {
      concatenator: (a) => {
        return (
          Number(`0x${a[0].toString("hex")}`) +
          Number(`0x${a[1].toString("hex")}`)
        );
      },
    });
    this.root = this.tree.getRoot().toString("hex");
  }

  poseidonHash(data) {
    return Field.toValue(Poseidon.hash([Field(data)]));
  }

  hashLeaves(data) {
    return data.map((d) => this.poseidonHash(d));
  }

  getLeaf(data) {
    return this.poseidonHash(data);
  }

  getProof(leaf) {
    return this.tree.getProof(leaf);
  }

  verify(proof, leaf) {
    return this.tree.verify(proof, leaf, this.root);
  }
}

module.exports = Tree;
