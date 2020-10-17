//TO DO upload working AVL code to github

import BST from "./BST.js";

class AVL extends BST{
  constructor(nodeD){
    super(nodeD);
  }

  //gets tree height
  getHeight(node){
    if(node == null)
      return 0;
    return node.height;
  }

  insert(value){
    super.insert(value);
  }

  insertRecur(value, entryNode, parentNode = null){
    let bal;
    // let tempNode;
    let duplicate;
    duplicate = super.insertRecur(value, entryNode, parentNode);

    if(duplicate) //don't allow duplicates
      return duplicate;

    //update entryNode height
    entryNode.height = Math.max(this.getHeight(entryNode.getLChild()),
      this.getHeight(entryNode.getRChild())) + 1;

    //get balance factor of node
    bal = this.getHeight(entryNode.getLChild()) - this.getHeight(entryNode.getRChild());

    this.rebalance(bal, value, entryNode, parentNode);
    return duplicate;
  }

  delete(val){
    this.delRecur(val, this.root, this.root);
  }

  delRecur(val, node, parent){
    let result;
    let bal;
    //do the delete
    let less = false;
    let isRoot = false;
    //is this the root
    if(node === this.root)
      isRoot = true;

    if(!node)//not found
    return false;

    if(val < node.val)
      result = this.delRecur(val, node.lChild, node);
    else if(val > node.val)
      result = this.delRecur(val, node.rChild, node);
    else if(val == node.val){
      if(node.getValue() < parent.getValue())//child is less than parent
        less = true;

      if(!node.rChild && node.lChild != null){//only has left child
        if(isRoot)
          this.root = node.lChild;
        else if(less)//node is less than parent
          parent.lChild = node.lChild;
        else//node is greater than parent
          parent.rChild = node.lChild;
      }
      else if(!node.lChild && node.rChild != null){//only has right child    
        if(isRoot)
          this.root = node.rChild;
        else if(less)//node is less than parent 
          parent.lChild = node.rChild;
        else//node is greater than parent
          parent.rChild = node.rChild;
      }
      else if(node.lChild != null && node.rChild != null){//node has both
        let temp = this.predecessor(node.lChild, node); //gets inorder predeccessor node

        //set temp's children to node to be deleted's children
        if(temp == node.lChild)//predecessor node is left child of node to be deleted
          temp.lChild = null;
        else
          temp.lChild = node.lChild;
        temp.rChild = node.rChild;

        if(isRoot)
          this.root = temp;
        else if(less)//node is less than parent
          parent.lChild = temp;
        else//node is greater than parent
          parent.rChild = temp;
      }
      else{//node to delete is leaf
        if(isRoot)
          this.root = null;
        else if(less)//node is less than parent
          parent.lChild = null;
        else//node is greater than parent
          parent.rChild = null;
      }

      if(isRoot)
        result = true;
      else
        return true;
    }

    //rebalance
    if(isRoot){
       parent = null; //to let rebalance know we fed in root node
    }
    //update node height
    node.height = Math.max(this.getHeight(node.getLChild()),
    this.getHeight(node.getRChild())) + 1;

    //get balance factor of node
    bal = this.getHeight(node.getLChild()) - this.getHeight(node.getRChild());

    this.rebalance(bal, val, node, parent);
    return result;
  }
  
  find(val){
    return super.find(val);
  }

  findRecur(val, node, parent){
    return super.findRecur(val, node, parent);
  }

  predecessor(node, parent){
    return super.predecessor(node, parent);
  }

  predRecur(node, parent){
    return super.predRecur(node, parent);
  }  

  pivotR(trblNode){
    let temp1 = trblNode.getLChild();
    let temp = temp1.getRChild();

    // Perform rotation
    temp1.setRChild(trblNode);
    trblNode.setLChild(temp);

    // Update heights
    trblNode.height = Math.max(this.getHeight(trblNode.getLChild()),
      this.getHeight(trblNode.getRChild())) + 1;
    temp1.height = Math.max(this.getHeight(temp1.getLChild()),
      this.getHeight(temp1.getRChild())) + 1;

    return temp1;
  }

  pivotL(trblNode){

    let temp1 = trblNode.getRChild();
    let temp = temp1.getLChild();

    // Perform rotation
    temp1.setLChild(trblNode);
    trblNode.setRChild(temp);

    // Update heights
    trblNode.height = Math.max(this.getHeight(trblNode.getLChild()),
      this.getHeight(trblNode.getRChild())) + 1;
    temp1.height = Math.max(this.getHeight(temp1.getLChild()),
      this.getHeight(temp1.getRChild())) + 1;

    return temp1;
  }

  rebalance(bal, value, entryNode, parentNode){
    let tempNode;
    // If this node becomes unbalanced, then there
    // are 4 cases Left Left Case
    if (bal > 1 && value < entryNode.getLChild().getValue())
    {
      tempNode = this.pivotR(entryNode);
    }
    // Right Right Case
    else if (bal < -1 && value >= entryNode.getRChild().getValue())
    {
      tempNode = this.pivotL(entryNode);
    }
    // Left Right Case
    else if (bal > 1 && value >= entryNode.getLChild().getValue()) {
      entryNode.setLChild(this.pivotL(entryNode.getLChild()));
      tempNode = this.pivotR(entryNode);
    }
    // Right Left Case
    else if (bal < -1 && value < entryNode.getRChild().getValue()) {
      entryNode.setRChild(this.pivotR(entryNode.getRChild()));
      tempNode = this.pivotL(entryNode);
    }

    //set parent child to the new root
    if(tempNode){
      if(parentNode == null){ // trblNode was root
        this.root = tempNode;
      }
      else if(tempNode.getValue() < parentNode.getValue())
        parentNode.setLChild(tempNode);
      else
        parentNode.setRChild(tempNode);
    }
  }
}
export default AVL;