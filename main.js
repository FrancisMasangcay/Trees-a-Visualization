//TO DO add find logic to buttons
//TO DO add binary search tree drawing functionality
//TO DO implement progressive animations
//TO DO implement mutiple canvases 

import AVL from "./classes/AVL.js";
import BST from "./classes/BST.js";

//get document nodes and attributes
const s = document.getElementById("p5-sketch");
const i = document.getElementById("inputs");
const c = document.getElementById("controls");
const _width = s.clientWidth; 
const _height = s.clientHeight;
//set node diameter for trees
const nodeDia = _width / 25;

var AVLTree = new AVL(nodeDia);
var BSTree = new BST(nodeDia);

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
            //Draw Red Black Tree
            break;
          case 3:
            //Draw Red Black Tree
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
    let i_elts = [insertBtn, i_input];
    const insertDiv = createDiv(b, i_elts);
    insertDiv.parent("inputs");

    //find button
    let findBtn = b.createButton("Find");
    let f_input = b.createInput("");
    findBtn.mousePressed(() => {
      var value = parseInt(f_input.value());
      if(value != ""){
        for(var i = 0; i < 4; i++){
          if(dataStructures[i] == 1){
            switch(i){
              case 0:
                BSTree.find(value);
                break;
              case 1:
                AVLTree.find(value);
                break;
              case 2:
                //RedBlack Tree find
                break;
              case 3:
                //Heap find
                break;
            }
          }
        }
      }
    });
    let f_elts = [findBtn, f_input]
    const findDiv = createDiv(b, f_elts);
    findDiv.parent("inputs");
    
    //delete btn
    let delBtn = b.createButton("Delete");
    let d_input = b.createInput("");
    d_input.elt.onkeydown = (e) => {
      if(e.key === "Enter"){
        _delete(d_input);
      }
    };
    delBtn.elt.onclick = (e) => {
      _delete(d_input);
    };
    let d_elts = [delBtn, d_input];
    const delDiv = createDiv(b, d_elts);
    delDiv.parent("inputs");

    let bst = b.createButton("Binary Search Tree");
    bst.mousePressed(() => {
      dataStructures[0] = Math.abs(dataStructures[0] - 1);
      bst.elt.classList.toggle('selected');
    });
    let avl = b.createButton("AVL Tree");

    //set default selected tree type to AVL
    dataStructures[1] = 1; 
    avl.elt.classList.add('selected');

    avl.mousePressed(() => {
      dataStructures[1] = Math.abs(dataStructures[1] - 1);
      avl.elt.classList.toggle('selected');
      console.log(dataStructures);
    });
    let rb = b.createButton("Red Black Tree");
    rb.mousePressed(() => {
      dataStructures[2] = Math.abs(dataStructures[2] - 1);
      rb.elt.classList.toggle('selected');
    });
    let heap = b.createButton("Min Heap");
    heap.mousePressed(() => {
      dataStructures[3] = Math.abs(dataStructures[3] - 1);
      heap.elt.classList.toggle('selected');
    });
    let cntrl = [avl, bst, rb, heap];
    const cntrlDiv = createDiv(b, cntrl);
    cntrlDiv.parent("controls");
  }

  // b.draw = () => {
  //   b.clear();
  //   for(var i = 0; i < dataStructures.length; i++){
  //     if(dataStructures[i] == 1){
  //       switch(i){
  //         case 0:
  //           drawTree(_width / 2, _width / 11, BSTree.root);
  //           break;
  //         case 1:
  //           drawTree(_width / 2, _width / 11, AVLTree.root);
  //           break;
  //         case 2:
  //           //Draw Red Black Tree
  //           break;
  //         case 3:
  //           //Draw Red Black Tree
  //           break;
  //       }
  //     }
  //   }
  // }
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
            console.log("Inserted " + value + " to AVL");
            AVLTree.insert(value);
            break;
          case 2:
            //RedBlack Tree insert
            break;
          case 3:
            //Heap Insert
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
            console.log("Deleted " + value + " from AVL");
            AVLTree.delete(value);
            break;
          case 2:
            //RedBlack Tree insert
            break;
          case 3:
            //Heap Insert
            break;
        }
      }
    }
    inputField.value("");
    structure.redraw();
  }
}
/**
 * called by p5 draw function
 * params: x -> x coordinate for the draw
 *         y -> y coordinate for the draw
 */
function drawTree(x, y, node){
  if(node == null ){return;} //base case
  let rad = nodeDia / 2;

  //x2, y2 coordinates for left child center
  let x2 = x - node.lWidth() * nodeDia;
  let y2 = y + nodeDia;
  
  if(node.getLChild() != null){
    structure.line(x, y, x2, y2);
    drawTree(x2, y2, node.getLChild()); //draw child node
  }

  if(node.getRChild() != null){
    //recalculate x2, y2 for right child node
    x2 = node.rWidth() * nodeDia + x;
    y2 =  y + nodeDia;

    structure.line(x, y, x2, y2);

    drawTree(x2, y2, node.getRChild());
  }
  structure.circle(x, y, nodeDia); //draw node so it is atop edge
  //draw node value
  structure.textAlign(structure.CENTER, structure.CENTER);
  structure.textSize(rad / 2);
  structure.text(node.getValue(), x - rad/2, y, rad);
  }

export default {structure, bttns};