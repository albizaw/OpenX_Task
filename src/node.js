// node.js
module.exports = class BSTNode {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  addBSTNode(data) {
    const nodeToAdd = new BSTNode(data);

    if (!this.data) {
      this.data = data;
      return;
    }

    let pom = this;
    while (true) {
      if (data < pom.data) {
        if (!pom.left) {
          pom.left = nodeToAdd;
          break;
        } else {
          pom = pom.left;
        }
      } else {
        if (!pom.right) {
          pom.right = nodeToAdd;
          break;
        } else {
          pom = pom.right;
        }
      }
    }

    nodeToAdd.parent = pom;
  }

  countLeafNodes() {
    const leafNodes = [];

    if (!this.left && !this.right) {
      leafNodes.push(this.data);
    } else {
      if (this.left) {
        leafNodes.push(...this.left.countLeafNodes().nodes);
      }
      if (this.right) {
        leafNodes.push(...this.right.countLeafNodes().nodes);
      }
    }

    return { count: leafNodes.length, nodes: leafNodes };
  }

  maxEdgePath() {
    if (!this.left && !this.right) {
      return { count: 1, path: [this.data] };
    } else {
      let leftMax = { count: 1, path: [] };
      let rightMax = { count: 1, path: [] };
      if (this.left) {
        leftMax = this.left.maxEdgePath();
        leftMax.count += 1;
        leftMax.path.unshift(this.data);
      }
      if (this.right) {
        rightMax = this.right.maxEdgePath();
        rightMax.count += 1;
        rightMax.path.unshift(this.data);
      }
      if (leftMax.count >= rightMax.count) {
        return leftMax;
      } else {
        return rightMax;
      }
    }
  }

  isEqual(otherNode) {
    if (this === otherNode) {
      return true;
    }

    if (this.data !== otherNode.data) {
      return false;
    }

    let leftEqual = true;
    let rightEqual = true;

    if (this.left && otherNode.left) {
      leftEqual = this.left.isEqual(otherNode.left);
    } else if (this.left !== otherNode.left) {
      leftEqual = false;
    }

    if (this.right && otherNode.right) {
      rightEqual = this.right.isEqual(otherNode.right);
    } else if (this.right !== otherNode.right) {
      rightEqual = false;
    }

    return leftEqual && rightEqual;
  }
};


