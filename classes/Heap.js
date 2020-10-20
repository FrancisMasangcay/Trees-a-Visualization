import TreeNode from "./TreeNode.js";

class Heap{
  constructor(){
    this.root = null; //root will be a treeNode 
    this.empty = true;
    this.heap = [];
  }

  insert(val){
    for(let i = 0; i < this.heap.length; i++)
      if(val == this.heap[i])
        return; //don't allow duplicates in the heap
    
    this.heap.push(val); //insert val into heap array implementation
    let index = this.heap.length - 1;
    //insert into an empty tree
    if(this.empty){
      this.root = new TreeNode(val);
      this.empty = false;
    }
    /**
     * if heap is not empty or just a root node find the ancestors of 
     * the inserted node and add a tree node to the appropriate spot 
     * on the visual tree
     */
    else{
      let stack = []; //stack will track parents going from bottom up order
      stack.push(index); //push current index to stack
      while(index != 0){ //repeat the while loop until index is at the trees root
        index = Math.floor((index - 1) / 2); //gets parent index
        stack.push(index); //push ancestor index to stack
      }
      let node = this.root; //tracks tree nodes to traverse
      let inserted = false; //tracks if tree insert is completed
      while(!inserted){
        let current = stack.pop(); //get the current root parent index from stack
        let left = (2 * current) + 1; //get the index of the current node's left child
        let desc = stack[stack.length - 1];// get the next ancestor node
        if(left == desc) //next descendent is left of current node
          if(!node.lChild){ //left child is empty so do an insert here
            node.lChild = new TreeNode(val);
            inserted = true;
          }
          else
            node = node.lChild;
        else //next descendent is right of current node
          if(!node.rChild){ //right child is empty so do an insert here
            node.rChild = new TreeNode(val);
            inserted = true;
          }
          else
            node = node.rChild;
      }
    }
    this.heapifyUp(this.heap.length-1); //run heapify on end of array
  }

  delete(){
    if(this.heap.length == 0) //heap is empty
      return;
    let r = this.heap[0];
    let index = this.heap.length - 1; //node to be moved up to root
    let parent = Math.floor((index - 1) / 2); //parent nodes index in the array
    let pNode = this.find(this.heap[parent]); //parent node of value being moved up
    let leaf = this.heap[index]; //value of node to be moved up to root

    //delete greatest left subtree leaf node
    if(this.heap.length == 1){//tree is only root
      this.root = null; //delete the root node
      return this.heap.pop();
    }
    if(pNode.lChild && pNode.lChild.val == leaf)
      pNode.lChild = null;
    else if(pNode.rChild && pNode.rChild.val == leaf)
      pNode.rChild = null;
    
    //update root node
    this.root.val = leaf;
    //swap root with last elem in array and remove last elem
    this.heap[0] = this.heap.pop();
    
    //heapify but start from root and perculate down
    this.heapifyDown(0);
    return r; //return the deleted root node
  }

  /**Heapifies both array and tree represetnation of heap using bottom
   * up comparisons
   * 
   * @param {number} index is the child node that is being checked
   * against its parent for min heap property compliance
   */
  heapifyUp(index){
    if(index == 0) //root node is base case
      return;
    let parentIndex = Math.floor((index - 1) / 2);
    //node values
    let child = this.heap[index];
    let parent = this.heap[parentIndex];

    if(child < parent){//min heap property violated
      //tree nodes for swap
      let pNode = this.find(parent);
      let cNode = this.find(child);
      //do a swap in the array
      this.heap[index] = parent;
      this.heap[parentIndex] = child;

      //do a swap in the tree
      pNode.val = child;
      cNode.val = parent;
    }
    this.heapifyUp(parentIndex);
  }
  /**Heapifies both array and tree represetnation of heap using top
   * down comparison
   * 
   * @param {number} index is the parent node that is being checked
   * against its children for min heap property compliance
   */
  heapifyDown(index){
    //array indices
    let leftInd = (2 * index) + 1;
    let rightInd = leftInd + 1;
    //a leaf node is base case
    if(leftInd >= this.heap.length && rightInd >= this.heap.lenth) 
      return;
    //node values
    let parent = this.heap[index];
    let left = this.heap[leftInd];
    let right = this.heap[rightInd];
    
    //find the minimum of the two children
    let minIndex;
    let min;
    if(left < right || !right){
      min = left;
      minIndex = leftInd; 
    }
    else{
      min = right;
      minIndex = rightInd;
    }

    if(min < parent){//min heap property violated
      //tree nodes for swap
      let pNode = this.find(parent);
      let cNode = this.find(min);
      //do a swap in the array
      this.heap[index] = min;
      this.heap[minIndex] = parent;

      //do a swap in the tree
      pNode.val = min;
      cNode.val = parent;
      this.heapifyDown(minIndex);
    }
  }

  //utility function to find a node returns a node
  find(val){
    return this.findRecur(val, this.root);
  }
  findRecur(val, node){
    let n;
    if(!node) return null;
    if(val == node.val){
      return node;
    }
    else{//traverse tree in preorder and find the value
      n = this.findRecur(val, node.lChild);
      if(n) return n;
      n = this.findRecur(val, node.rChild);
      if(n) return n;
    }
  }
}
export default Heap;