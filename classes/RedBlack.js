//TO DO implement delete
import TreeNode from "./TreeNode.js";

class RBnode extends TreeNode{
  constructor(val, par = null, sib = null){
    super(val);
    this.parent = par;
    this.sibling = sib;
    this.red = 1;
    this.black = 0;
  }
  //utility function to recolor a node
  recolor(){
    this.red = Math.abs(this.red - 1);
    this.black = Math.abs(this.black - 1);
  }
}

class RedBlack{
  constructor(){
    this.root = null;
  }

  insert(val){
    //empty tree
    if(this.root == null){
      this.root = new RBnode(val);
      this.root.red = 0;
      this.root.black = 1;
      return;
    }
    //bst insert
    let node = this.bstInsert(val);
    if(node)
      this.fix(node);
  }

  delete(val){
    //if node to be deleted is red, just delete it (replace value dont move nodes around)
      //inorder predecessor is taken and this will be the deleted node.
    //problem occurrs when you delete a black node
    //steps: 1. perfomr normal bst deletion
  }

  bstInsert(val, node = this.root){
    if(val < node.val){
      if(!node.lChild){//left child doesn't exist
        let child = new RBnode(val, node, node.rChild);
        node.lChild = child;

        //update relationships
        if(node.rChild)
          node.rChild.sibling = child;
        return child;
      }
      else
        return this.bstInsert(val, node.lChild);
    }
    else if(val > node.val){
      if(!node.rChild){//right child doesn't exist
        let child = new RBnode(val, node, node.lChild);
        node.rChild = child;

        //update relationships
        if(node.lChild)
          node.lChild.sibling = child;
        return child;
      }
      else
        return this.bstInsert(val, node.rChild);
    }
    else//dont allow duplicates
      return null;
  }

  //utility function to check RedBlack properties and fix the tree as needed
  //node is the RBnode being repaired
  fix(node){
    let uncle = node.parent.sibling;
    let grand = node.parent.parent;
    let grandVal;
    if(grand)
      grandVal = grand.val;
    if(!node || node.parent.black == 1)//was a duplicate value or parentNode is black
      return;
    else if(!uncle || uncle.black == 1){//new node's uncle node is black or null
      let subroot;
      let isRoot;
      (grand == this.root) ? isRoot = true : isRoot = false;
      // do a rotation
      //Right right case
      if(node.val > node.parent.val && node.parent.val > grand.val){
        subroot = this.pivotL(grand);
        subroot.recolor();
        subroot.lChild.recolor();
      }
      //Left left case
      if(node.val < node.parent.val && node.parent.val < grand.val){
        subroot = this.pivotR(grand);
        subroot.recolor();
        subroot.rChild.recolor();
      }
      //Right Left case
      if(node.val < node.parent.val && node.parent.val > grand.val){
        grand.rChild = this.pivotR(node.parent);
        subroot = this.pivotL(grand);
        subroot.recolor();
        subroot.lChild.recolor();
      }
      //Left right case
      if(node.val > node.parent.val && node.parent.val < grand.val){
        grand.lChild = this.pivotL(node.parent);
        subroot  = this.pivotR(grand);
        subroot.recolor();
        subroot.rChild.recolor();
      }
      if(isRoot)
        this.root = subroot;
      else if(grandVal > subroot.parent.val)//node fixed was right child
        subroot.parent.rChild = subroot;
      else
        subroot.parent.lChild = subroot;
    }
    else{//new node's uncle is red
      node.parent.recolor();
      uncle.recolor();
      if(grand != this.root){
        grand.recolor();
        this.fix(grand); //recheck grandparent
      }
      else
        return;
    }
  }

  pivotL(node){
    let temp = node.rChild.lChild;
    let subroot = node.rChild;

    //switch
    subroot.lChild = node;
    node.rChild = temp;
    //update relationships
    //temp
    if(temp){
      temp.sibling = node.lChild;
      temp.parent = node;
    }
    //subroot.right
    subroot.rChild.sibling = subroot.lChild;
    //subroot
    subroot.parent = node.parent;
    // if(node.val > node.parent.val) //node was right child
    //   subroot.parent.rChild = subroot;
    // else
    //   subroot.parent.lChild = subroot;
    //node
    node.parent = subroot;
    node.sibling = subroot.rChild;

    return subroot;
  }
  pivotR(node){
    let temp = node.lChild.rChild;
    let subroot = node.lChild;

    //switch
    subroot.rChild = node;
    node.lChild = temp;
    //update relationships
    //temp
    if(temp){
      temp.sibling = node.rChild;
      temp.parent = node;
    }
    //subroot.left
    subroot.lChild.sibling = subroot.rChild;
    //subroot
    subroot.parent = node.parent;
    // if(node.val > node.parent.val) //node was right child
    //   subroot.parent.rChild = subroot;
    // else
    //   subroot.parent.lChild = subroot;
    //node
    node.parent = subroot;
    node.sibling = subroot.lChild;

    return subroot;
  }
}
export default RedBlack;