import treeNode from "./TreeNode.js";

class BST{
  constructor(){
    this.root = null;
  }

  insert(value){
    if(this.root == null) //handle empty tree
    {
      this.root = new treeNode(value);
    }
    else //handle nonempty tree
    {
      this.insertRecur(value, this.root);
    }
  }

  insertRecur(value, entryNode, parentNode = null){
    let duplicate;
    if(value < entryNode.getValue()) //handle less than
    {
      if(entryNode.getLChild() == null){ //no left children, insert into left child
        //create new node and set child to the new node
        let child = new treeNode(value);
        entryNode.setLChild(child);
        return false; //was not a duplicate
      }
      else{ //left child exists
        duplicate = this.insertRecur(value, entryNode.getLChild(), entryNode);
      }
    }
    else if (value > entryNode.getValue()) //handle greater than
    {
      if(entryNode.getRChild() == null){
        //create new node and set child to the new node
        let child = new treeNode(value);
        entryNode.setRChild(child);
        return false; //was not a duplicate
      }
      else{
        duplicate = this.insertRecur(value, entryNode.getRChild(), entryNode);
      }
    }
    else //don't allow duplicate values
      return true;
    return duplicate;
  }

  find(val){
    return this.findRecur(val, this.root, this.root);
  }
  findRecur(val, node, parent){
    var _package = {n : node, p : parent, found : false};
    if(node == null) //node not found
      return _package;
    else if(val === node.getValue()){ //node found
      _package.found = true;
      return _package;
    }
    else if(val < node.getValue()){ //value is less than node
      _package = this.findRecur(val, node.getLChild(), node);
    }
    else{ //value greater than node
      _package = this.findRecur(val, node.getRChild(), node);
    }
    return _package;
  }

  delete(val){
    let toDelete = this.find(val);
    let node = toDelete.n;
    let parent = toDelete.p;
    let less = false;
    let isRoot = false;

    if(node === this.root)
      isRoot = true;
    if(node.getValue() < parent.getValue())//child is less than parent
      less = true;

    if(toDelete.found){ //node found
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
    }
    return toDelete;
  }

  /** utility functions for delete
   * 
   * finds the in order predecessor to the parent parameter
   * node is the root node of the left subtree to parent
   * 
   * returns a tree node
   */
  predecessor(node, parent){
    if(!node.rChild){
      parent.lChild = node.lChild;
      return node;
    }
    return this.predRecur(node.rChild, node);
  }

  predRecur(node, parent){
    if(!node.rChild){
      parent.rChild = node.lChild;
      return node;
    }

    return this.predRecur(node.rChild, node);
  }
}
export default BST;