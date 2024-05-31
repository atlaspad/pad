const Memory = require("./memory.js");
const Tree = require("./index.js");
const sampleAddresses = require("./addresses.data.js");
// const memory = new Memory(sampleAddresses);

const address = "0x9502F71D9d37728C56175Fd9a0A5f1c1Fe472B61";
const tree = new Tree(sampleAddresses)
console.log(tree.tree.toString());
// console.log(tree.poseidonHash(address));

// const leaf = memory.treeClass.getLeaf(address);
// const proof = memory.treeClass.getProof(leaf);

// console.log(memory.verify(proof, leaf));


const leaf = tree.getLeaf(address);
const proof = tree.getProof(leaf);

console.log(tree.verify(proof, leaf));
