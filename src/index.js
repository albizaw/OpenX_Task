const BSTNode = require('./node.js');

const root = new BSTNode(5);
root.addBSTNode(7);
root.addBSTNode(2);
root.addBSTNode(8);
root.addBSTNode(0);
root.addBSTNode(5);
root.addBSTNode(10);

const copy = new BSTNode(5);
copy.addBSTNode(7);
copy.addBSTNode(3);
copy.addBSTNode(8);
copy.addBSTNode(0);
copy.addBSTNode(5);

const leafNodes = root.countLeafNodes();
console.log('\nNumber of nodes without child: ' + leafNodes.count);
console.log('Leaf Nodes: ' + leafNodes.nodes.join(', '));

const maxEdges = root.maxEdgePath();
console.log(
  '\n\nMaximum number of edges from root to leaf node: ' + maxEdges.count
);
console.log('Path: ' + maxEdges.path.join(' -> '));

console.log(
  '\n\nChecking two instances datta structures are equivalent to each other.'
);
console.log(root.isEqual(copy) + '\n\n'); // true
