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
    let isRoot = false;
    //find the node
    let node = this.root;
    while(true){
      if(!node || node.val == val)
        break;
      else if(val < node.val)
        node = node.lChild;
      else
        node = node.rChild;
    }

    if(!node) return; //val not found
    
    let pred = this.pred(node);//find predecessor
    node.val = pred.val; //update node value to the predeccessor's
    node = pred; //update node to track the predecessor

    //in case predecessor had a left subtree find the next predecessor until leaf
    while(pred.lChild || pred.rChild){//break if pred is leaf
      pred = this.pred(node); //get new predecessor
      node.val = pred.val; //update node value to the predeccessor's
      node = pred; //update node to track the predecessor
    }
    //do the delete and update relationships
    if(pred == this.root){
      isRoot = true;
      if(!pred.rChild && !pred.lChild) //empty tree
        this.root = null;
    }
    else if(pred.val > pred.parent.val){//predecessor is right child
      //update relationships
      pred.parent.rChild = pred.lChild;
      if(pred.parent.lChild)
        pred.parent.lChild.sibling = pred.lChild;
    }
    else{//predecessor is left child
      //update relationships
      pred.parent.lChild = pred.lChild;
      if(pred.parent.rChild)
        pred.parent.rChild.sibling = pred.lChild;
    }
    if(pred.black == 1 && !isRoot){ //pred was a black node
      pred.black++;
      this.fixDB(pred);//predecessor is now a double black node
    }
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
    if(subroot.rChild)
      subroot.rChild.sibling = subroot.lChild;
    //subroot
    subroot.parent = node.parent;
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
    if(subroot.lChild)
      subroot.lChild.sibling = subroot.rChild;
    //subroot
    subroot.parent = node.parent;
    node.parent = subroot;
    node.sibling = subroot.lChild;

    return subroot;
  }

  //utility function to find inorder predecessor of node
  pred(node){
    //if node exists, find the inorder predecessor
    if(node){
      var pred = node.lChild;
      while(true){
        if(pred && pred.rChild)
          pred = pred.rChild;
        else
          break;
      }
    }
    if(pred)
      return pred;
    else
      return node;
  }

  //utility function to fix double black node situations
  //parameter pred is a RBnode representiing the predecessor node from delete
  //that will be removed from the tree
  //if there is still a DB then will recall itself to fix DB
  fixDB(node){
    let subroot; //will track the new root of a subtree after a pivot is done
    //is the parent the root node?
    let isRoot;
    (node.parent == this.root) ? isRoot = true : isRoot = false;
  

    let grand = node.parent.parent;

    //track which child this node is to parent
    let left = false;
    if(node.val < node.parent.val)
      left = true;

    //if sibling children are both black nephewsB = true, otherwise false
    let nephewsB = false;
    if((!node.sibling.lChild) || (node.sibling.lChild.black == 1))
      if((!node.sibling.rChild) || (node.sibling.rChild.black == 1))
        nephewsB = true;
    
    if(this.root.black == 2){ //root became double black
      this.root.black--; //remove the double black
      return;
    }
    else if(node.sibling.black == 1 && nephewsB){//sibling + nephews are black nodes 
      node.black--; //remove doble black from node
      //add black to parent
      node.parent.black++;
      if(node.parent.red == 1)
        node.parent.red = 0;
      node.sibling.recolor();
      if(node.parent.black > 1)//DB still exists
        this.fixDB(node.parent);
    }
    else if(node.sibling.red == 1){//sibling is red
      //swap parent and siblings colors
      let temp1 = node.parent.red;
      let temp2 = node.parent.black;
      node.parent.red = node.sibling.red;
      node.parent.black = node.sibling.black;
      node.sibling.red = temp1;
      node.sibling.black = temp2;
      
      if(node.val < node.parent.val){//is left child, do a left rotate
        subroot = this.pivotL(node.parent);
        node.sibling = node.parent.rChild;
        if(isRoot)
          this.root = subroot;
        else if(node.parent.val < grand.val) //parent is lChild of grand
          grand.lChild = subroot;
        else
          grand.rChild = subroot;
      }
      else{//is right child, do a right rotate
        subroot = this.pivotR(node.parent);
        node.sibling = node.parent.lChild;
        if(isRoot)
          this.root = subroot;
        else if(node.parent.val < grand.val) //parent is lChild of grand
          grand.lChild = subroot;
        else
          grand.rChild = subroot;
      }
      this.fixDB(node);
    }
    //sibling is black but nephews are not both black
    else if(left){//node is left child of parent
      let temp1 = node.sibling.red;
      let temp2 = node.sibling.black;
      //case 5 near nephew is red
      if(node.sibling.lChild.red == 1 && node.sibling.rChild.black == 1){
        //swap sibling and near nephew colors
        node.sibling.red = node.sibling.lChild.red;
        node.sibling.black = node.sibling.lChild.black;

        node.sibling.lChild.red = temp1;
        node.sibling.lChild.black = temp2;

        //do a right rotation away from node
        subroot = this.pivotR(node.sibling);
        node.parent.rChild = subroot;

        this.fixDB(node); //recheck cases
      }
      //case 6 far nephew is red
      else if(node.sibling.rChild.red == 1){
        //swap parent and siblings colors
        let t1 = node.parent.red;
        let t2 = node.parent.black;
        node.parent.red = node.sibling.red;
        node.parent.black = node.sibling.black;
        node.sibling.red = t1;
        node.sibling.black = t2;

        //do a rotation based on node parent towards node
        subroot = this.pivotL(node.parent);
        if(isRoot)
          this.root = subroot;
        else if(node.parent.val < grand.val) //parent is lChild of grand
          grand.lChild = subroot;
        else
          grand.rChild = subroot;

        //change red node to black
        node.sibling.rChild.recolor();
      }
    }
    else if(!left){//node is right child of parent
      //case 5 near nephew is red
      let temp1 = node.sibling.red;
      let temp2 = node.sibling.black;
      if(node.sibling.rChild.red == 1 && node.sibling.lChild.black == 1){
        //swap sibling and near nephew colors
        node.sibling.red = node.sibling.lChild.red;
        node.sibling.black = node.sibling.lChild.black;

        node.sibling.rChild.red = temp1;
        node.sibling.rChild.black = temp2;

        //do a left rotation away from node
        subroot = this.pivotL(node.sibling);
        node.parent.lChild = subroot;

        this.fixDB(node); //recheck cases
      }
      //case 6 far nephew is red
      else if(node.sibling.lChild.red == 1){
        //swap parent and siblings colors
        let temp1 = node.parent.red;
        let temp2 = node.parent.black;
        node.parent.red = node.sibling.red;
        node.parent.black = node.sibling.black;
        node.sibling.red = temp1;
        node.sibling.black = temp2;

        //do a rotation based on node parent towards node
        subroot = this.pivotR(node.parent);
        if(isRoot)
          this.root = subroot;
        else if(node.parent.val < grand.val) //parent is lChild of grand
          grand.lChild = subroot;
        else
          grand.rChild = subroot;

        //change red node to black
        node.sibling.lChild.recolor();
      }
    }
  }
}
export default RedBlack;