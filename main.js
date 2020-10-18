import AVL from "./classes/AVL.js";
import BST from "./classes/BST.js";
import MinHeap from "./classes/Heap.js";
import RB from "./classes/RedBlack.js";

//get document nodes and attributes
const s = document.getElementById("p5-sketch");
const _width = s.clientWidth; 
const _height = s.clientHeight;
//set node diameter for trees
const nodeDia = _width / 25;

var AVLTree = new AVL();
var BSTree = new BST();
var Heap = new MinHeap();
var RedBlack = new RB();

/**
 * Array to track structure selections numbers indicate
 * selected struct
 * 
 * mapping:
 * value:   0     1       2         3    
 * struct:  BST   AVL  RedBlack    Heap 
 */
var dataStructures = [0, 0, 0, 0];

const drawStructures = (c) => {
  c.setup = () => {
    const canvas = c.createCanvas(_width, _height);
    c.background(0, 255, 0);
    c.noLoop();
  }

  c.draw = () => {
    c.clear();
    c.background("white");
    //draw root node in center along horizontal and space each node 1/11 
    //of container width away from each other
    for(var i = 0; i < dataStructures.length; i++){
      if(dataStructures[i] == 1){
        switch(i){
          case 0:
            drawTree(_width / 2, _width / 11, BSTree.root);
            break;
          case 1:
            drawTree(_width / 2, _width / 11, AVLTree.root);
            break;
          case 2:
            drawTree(_width / 2, _width / 11, RedBlack.root, true);
            break;
          case 3:
            drawTree(_width / 2, _width / 11, Heap.root);
            break;
        }
      }
    }
  }
}

const drawButtons = (b) => {
  b.setup = () => {
    b.noLoop();
    //insert button
    const insertBtn = b.createButton("Insert");
    const i_input = b.createInput("");
    i_input.elt.onkeydown = (e) => {
      if(e.key === "Enter"){
        insert(i_input);
      }
    };
    insertBtn.elt.onclick = (e) => {
      insert(i_input);
    };
    var i_elts = [insertBtn, i_input];
    const insertDiv = createDiv(b, i_elts);
    insertDiv.parent("inputs");
    
    //delete btn
    var delBtn = b.createButton("Delete");
    var d_input = b.createInput("");
    d_input.elt.onkeydown = (e) => {
      if(e.key === "Enter"){
        _delete(d_input);
      }
    };
    delBtn.elt.onclick = (e) => {
      _delete(d_input);
    };
    var d_elts = [delBtn, d_input];
    const delDiv = createDiv(b, d_elts);
    delDiv.parent("inputs");
    //create the control buttons
    let bst = b.createButton("Binary Search Tree");
    let avl = b.createButton("AVL Tree");
    let rb = b.createButton("Red Black Tree");
    let heap = b.createButton("Min Heap");
    let cntrl = [bst, avl, rb, heap];

    bst.mousePressed(() => {
      d_input.elt.readOnly = false;
      d_input.elt.style = "font-size: 1.25rem";
      d_input.elt.placeholder = "";
      dataStructures[0] = 1;
      bst.elt.classList.add('selected');
      for(let i = 1; i < cntrl.length; i++){
        cntrl[i].elt.classList.remove('selected');
        dataStructures[i] = 0;
      }
      structure.redraw();
    });

    //set default selected tree type to BST
    dataStructures[0] = 1; 
    bst.elt.classList.add('selected');

    avl.mousePressed(() => {
      d_input.elt.readOnly = false;
      d_input.elt.style = "font-size: 1.25rem";
      d_input.elt.placeholder = "";
      dataStructures[1] = 1;
      avl.elt.classList.add('selected');
      for(let i = 0; i < cntrl.length; i++){
        if(i != 1){
          cntrl[i].elt.classList.remove('selected');
          dataStructures[i] = 0;
        }
      }
      structure.redraw();
    });
    rb.mousePressed(() => {
      d_input.elt.readOnly = false;
      d_input.elt.style = "font-size: 1.25rem";
      d_input.elt.placeholder = "";
      dataStructures[2] = 1;
      rb.elt.classList.add('selected');
      for(let i = 0; i < cntrl.length; i++){
        if(i != 2){
          cntrl[i].elt.classList.remove('selected');
          dataStructures[i] = 0;
        }
      }
      structure.redraw();
    });
    heap.mousePressed(() => {
      d_input.elt.readOnly = true;
      d_input.elt.style = "font-size: 1.1rem";
      d_input.elt.placeholder = "Heap Root";
      dataStructures[3] = 1;
      heap.elt.classList.add('selected');
      for(let i = 0; i < cntrl.length; i++){
        if(i != 3){
          cntrl[i].elt.classList.remove('selected');
          dataStructures[i] = 0;
        }
      }
      structure.redraw();
    });
    const cntrlDiv = createDiv(b, cntrl);
    cntrlDiv.parent("controls");
  }
}

function createDiv(theP5, elements){
  let container = theP5.createDiv();
  for(let i = 0; i < elements.length; i++){
    elements[i].parent(container);
  }
  return container;
}

const structure = new p5(drawStructures, document.getElementById("p5-sketch"));
const bttns = new p5(drawButtons);

function insert(inputField){
  var value = parseInt(inputField.value(), 10);
  if(!isNaN(value)){
    for(var i = 0; i < dataStructures.length; i++){
      if(dataStructures[i] == 1){
        switch(i){
          case 0:
            BSTree.insert(value);
            break;
          case 1:
            AVLTree.insert(value);
            break;
          case 2:
            RedBlack.insert(value);
            break;
          case 3:
            Heap.insert(value);
            break;
        }
      }
    }
    inputField.value("");
    structure.redraw();
  }
}

function _delete(inputField){
  var value = parseInt(inputField.value(), 10);
  if(!isNaN(value)){
    for(var i = 0; i < dataStructures.length; i++){
      if(dataStructures[i] == 1){
        switch(i){
          case 0:
            BSTree.delete(value);
            break;
          case 1:
            AVLTree.delete(value);
            break;
          case 2:
            RedBlack.delete(value);
            break;
          case 3:
            Heap.delete();
            break;
        }
      }
    }
    inputField.value("");
    structure.redraw();
  }
  else if(dataStructures[3] == 1){
    Heap.delete();
    inputField.value("");
    structure.redraw();
  }
}
/**
 * called by p5 draw function
 * params: x -> x coordinate for the draw
 *         y -> y coordinate for the draw
 */
function drawTree(x, y, node, isRB = false){
  if(node == null ){return;} //base case
  let rad = nodeDia / 2;

  //x2, y2 coordinates for left child center
  let x2 = x - node.lWidth() * nodeDia;
  let y2 = y + nodeDia;
  
  if(node.getLChild() != null){
    structure.strokeWeight(3);
    structure.stroke('black');
    structure.line(x, y, x2, y2);
    drawTree(x2, y2, node.getLChild(), isRB); //draw child node
  }

  if(node.getRChild() != null){
    //recalculate x2, y2 for right child node
    x2 = node.rWidth() * nodeDia + x;
    y2 =  y + nodeDia;
    structure.strokeWeight(3);
    structure.stroke('black');
    structure.line(x, y, x2, y2);

    drawTree(x2, y2, node.getRChild(), isRB);
  }

  structure.strokeWeight(3);
  structure.stroke('black');
  structure.fill("#94f3e0");
  if(isRB)
    (node.red == 1) ? structure.fill('red') : structure.fill('black');
  structure.circle(x, y, nodeDia); //draw node so it is atop edge
  //draw node value
  structure.strokeWeight(1);
  structure.fill('black');
  if(isRB){
    (node.red == 1) ? structure.fill('black') : structure.fill('white');
    (node.red == 1) ? structure.stroke('black') : structure.stroke('white');
  }
  structure.textAlign(structure.CENTER, structure.CENTER);
  structure.textSize(rad / 2);
  structure.text(node.getValue(), x - rad/2, y, rad);
}
export default {structure, bttns};