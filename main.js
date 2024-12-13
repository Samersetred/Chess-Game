let legalSquares=[];
 const boardSquares=document.getElementsByClassName("square");
 const pieces=document.getElementsByClassName("square");
 const piecesImages=document.getElementsByTagName("img");

 setupBoardSquares();
 setupPieces();
 function setupBoardSquares() {
    for (let i=0;<boardSquares.length;i++){
      boardSquares[i].addEventListener("dragover",allowDrop);
      boardSquares[i].addEventListener("drop",drop);
      let row=8-Math.floor(i/8);
      let column=String.fromCharCode(97+(i%8));
      let square=boardSquares[i];
      square.id=column+row;
    }
 }
 // the setupBoardSquares function sets up the event listeners and IDs for the squares on the chess board, it allows the squares to see information
// It loops through an array of boardSquares and for each square, it adds an event listener for the dragover and drop events, calling the allowDrop
// and drop functions respectively whn those events are triggered.
// The function also calculates the row and column of each square and assings an ID to the square in the format column + row, where column is a letter
// from 'a' to 'h' and row is a number from 1 to 8
function setupPieces() {
   for (let i=0;i<pieces.length;i++){
      pieces[i].addEventListener("dragstart",drag);
      pieces[i].setAttribute("draggable", true);
      pieces[i].id=pieces[i].className.split(" ")[1]+pieces[i].parentElement.id;
   }
   for (let i=0;i<piecesImages.length;i++){
      piecesImages[i].setAttribute("draggable", false); //the images of the pieces are being prevented form being dragged to ensure that only the pieces themselves can be dragged and dropped on the board

   }
}
function allowDrop(ev) {
   ev.preventDefault(); //by default, an element cannot be dropped on another element. Calling the preventDefault method on the dragover event cancels this default behaviour and allows the drop to occur
}
function drag(ev) { //drag function retrieves the target of the event, which is the piece elements being dragged
   const piece=ev.target; 
   ev.dataTransfer.setData("text",piece.id);//the function then calls the setData method on the dataTransfer property of the event object, setting the data type to "text" and the data value to the id of the piece.
   //This allows the data to be transferred during the drag and drop operation
}
function drop(ev){
   ev.preventDefault();
   let data=ev.dataTransfer.getData("text");
   const piece=document.getElementById(data);
   const destinationSquare=ev.currentTarget;
   let destinationSquareID=destinationSquare.id;
   destinationSquare.appendChild(piece);
}
//The function retrieves the data that was set during the dragstart event by calling the getData method on the dataTransfer property of the event object
//It then retrieves the target of the drop event, which is the element on which the drop occurred, and assigns it to the destinationSquare variable
//Finally, it appends the dragged element to the destinationSquare, effectively moving it to its new location on the board