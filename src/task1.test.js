const BSTNode = require('./node.js');

describe('BSTNode', () => {
  describe('adds a node to the left and right', () => {
    test('should add nodes correctly', () => {
      const root = new BSTNode(5);
      root.addBSTNode(3);
      root.addBSTNode(7);
      expect(root.left.data).toEqual(3);
      expect(root.right.data).toEqual(7);
    });
  });

  describe('counts the number of leaf nodes', () => {
    test('should count leaf nodes correctly', () => {
      const root = new BSTNode(5);
      root.addBSTNode(2);
      root.addBSTNode(7);
      root.addBSTNode(8);
      root.addBSTNode(0);
      root.addBSTNode(5);

      const leafNodes = root.countLeafNodes();
      expect(leafNodes.count).toEqual(3);
    });
  });

  describe('the maximum edge path', () => {
    test('should find the maximum edge path correctly', () => {
      const root = new BSTNode(5);
      root.addBSTNode(7);
      root.addBSTNode(2);
      root.addBSTNode(8);
      root.addBSTNode(0);
      root.addBSTNode(5);
      root.addBSTNode(10);

      const maxEdges = root.maxEdgePath();
      expect(maxEdges.count).toEqual(4);
      expect(maxEdges.path).toEqual([5, 7, 8, 10]);
    });
  });

  describe('checks if two BSTs are equal', () => {
    test('should check if two BSTs are equal correctly', () => {
      const root1 = new BSTNode(5);
      root1.addBSTNode(7);
      root1.addBSTNode(2);
      root1.addBSTNode(8);
      root1.addBSTNode(0);
      root1.addBSTNode(5);

      const root2 = new BSTNode(5);
      root2.addBSTNode(7);
      root2.addBSTNode(3);
      root2.addBSTNode(8);
      root2.addBSTNode(0);
      root2.addBSTNode(5);

      expect(root1.isEqual(root2)).toBe(false);
    });
  });
});
