class TreeNode {
  constructor(val){
    this.val = val;
    this.rChild = null;
    this.lChild = null;
    this.height = 1;
  }

  getValue(){
    return this.val;
  }

  setRChild(node){
    this.rChild = node;
  }

  setLChild(node){
    this.lChild = node;
  }

  getRChild(){
    return this.rChild;
  }

  getLChild(){
    return this.lChild;
  }

  getHeight(){
    return this.height;
  }

  rWidth(){
    let width = 0;
    if(this.rChild)
      width = this.getWidth(this.rChild.lChild, 1) + 1;
    return width;
  }
  
  lWidth(){
    let width = 0;
    if(this.lChild)
    //width = this.countRight(this.lChild.rChild, 0) + 1;
    width = this.getWidth(this.lChild.rChild, 1) + 1;
    return width;
  }
  
  //helper function for rWidth and lWidth
  getWidth(node, width){
    if(!node) return 0;

    width += node.getWidth(node.lChild, 1);
    width += node.getWidth(node.rChild, 1);
    return width;
  }
}
export default TreeNode;