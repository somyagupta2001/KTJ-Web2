var moves=0;
var start=0;
var time=0;
var timer;

//override to disable scrolling using arrow keys 
window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);

function setBestTime(){
  if(window.localStorage.getItem("bestTime"))
    document.getElementById("bestTimeDisplay").innerHTML="Best Time: "+window.localStorage.getItem("bestTime");
  else
    document.getElementById("bestTimeDisplay").innerHTML="Best Time: 0s";
}

function setBestMoves(){
  if(window.localStorage.getItem("bestMoves"))
    document.getElementById("bestMovesDisplay").innerHTML="Best Moves: "+window.localStorage.getItem("bestMoves");
  else
    document.getElementById("bestMovesDisplay").innerHTML="Best Moves: 0";
}

/*function createTable(m,n){
    var table=document.getElementById("table");
    for(let i=0; i<m; i++){
        var tableRow=document.createElement("div");
        tableRow.id="row"+i;
        tableRow.style.display="table-row";
        table.appendChild(tableRow);
        for(let j=0; j<n; j++){
            var cell=document.createElement("div");
            var style= document.createElement("style");
            style.type
          
          
          
            var cell=document.createElement("div");
            var container=document.createElement("div");
            cell.id="tile"+(i*n+j+1);
            container.id="cell"+(i+1)+(j+1);
            //alert(cell.className);
            container.addEventListener("click", function(){clickTile((i+1),(j+1),m,n)});
            container.addEventListener("click", moveMade);
            //alert("done");
            container.style.display="table-cell";
            container.style.width="120px";
            container.style.height=(m/n*120)+"px";
            container.style.border="2px solid rgb(10, 10, 10)";
            cell.style.height="100%";
            cell.style.width="100%";
            if((i==(m-1))&&(j==(n-1))){
                cell.style.backgroundColor="rgb(15, 15, 15)";
            }
            else{
                
                cell.style.background="url(MoneyHeist.jpg)";
                cell.style.backgroundSize=120*n+"px "+120*m/n*m+"px";
                cell.style.cursor="pointer";
                cell.style.backgroundPosition=j/(n-1)*100+"% "+i/(m-1)*100+"%";
            }
           
            container.appendChild(cell);
            tableRow.appendChild(container);
        } 
    }    
}*/

function swapTiles(cell1,cell2) {//alert(document.getElementById(cell1).className+document.getElementById(cell2).className);
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
    //alert(document.getElementById(cell1).className+document.getElementById(cell2).className);
  }
  
function shuffle(m,n) {
  //Use nested loops to access each cell of the 3x3 grid
  for (var row=1;row<=m;row++) { //For each row of the 3x3 grid
     for (var column=1;column<=n;column++) { //For each column in this row
    
      var row2=Math.floor(Math.random()*m + 1); //Pick a random row from 1 to 3
      var column2=Math.floor(Math.random()*n + 1); //Pick a random column from 1 to 3
       
      swapTiles("cell"+row+column,"cell"+row2+column2); //Swap the look & feel of both cells
    } 
  } 
  }
  
function clickTile(row,column,m,n) {
    var cell = document.getElementById("cell"+row+column);
    var tile = cell.id; 
    if (tile!="tile"+m*n) {
         //Checking if white tile on the right
         if (column<n) {
           if ( document.getElementById("cell"+row+(column+1)).className=="tile"+m*n) {//alert("ok");
             swapTiles("cell"+row+column,"cell"+row+(column+1));
             return;
           }
         }
         //Checking if white tile on the left
         if (column>1) {
           if ( document.getElementById("cell"+row+(column-1)).className=="tile"+m*n) {//alert("ok");
             swapTiles("cell"+row+column,"cell"+row+(column-1));
             return;
           }
         }
           //Checking if white tile is above
         if (row>1) {
           if ( document.getElementById("cell"+(row-1)+column).className=="tile"+m*n) {//alert("ok");
             swapTiles("cell"+row+column,"cell"+(row-1)+column);
             return;
           }
         }
         //Checking if white tile is below
         if (row<m) {
           if ( document.getElementById("cell"+(row+1)+column).className=="tile"+m*n) {//alert("ok");
             swapTiles("cell"+row+column,"cell"+(row+1)+column);
             return;
           }
         } 
    }
    
  }

function keyPressed(event,m,n){ 
    var x= event.key;
    //alert("key pressed: "+x);
    var tile = document.getElementsByClassName("tile"+m*n)[0];
    //alert("white tile at: "+tile.id);
    var cell = tile.id;
    //alert("tile9 at: "+cell);
    var column=parseInt(cell.substr(5,1));
    var row=parseInt(cell.substr(4,1));
    //alert("tile9 at: "+row+column);
    if (x=="ArrowUp"||x=="w"||x=="W") { 
         //Checking if there is a tile below white tile
         if (row<m) {
           {
             swapTiles("cell"+row+column,"cell"+(row+1)+column);
             return;
           }
         }
        }
    if (x=="ArrowDown"||x=="s"||x=="S"){
        //Checking if there is a tile above white tile
        if (row>1) {
            {
              swapTiles("cell"+row+column,"cell"+(row-1)+column);
              return;
            }
          }
    }
    if(x=="ArrowRight"||x=="d"||x=="D"){
        //Checking if there is a tile left of white tile
        if (column>1) {
            {
              swapTiles("cell"+row+column,"cell"+row+(column-1));
              return;
            }
          }
    }
    if(x=="ArrowLeft"||x=="a"||x=="A"){
        //Checking if there is a tile right of white tile
        if (column<n) {
            {
              swapTiles("cell"+row+column,"cell"+row+(column+1));
              return;
            }
          }
    }
        
}

//check if current combination of cell and tiles is correct
function isWin(m,n){
  var flag=1;
  for(let i=0; i<m; i++){
    for(let j=0; j<n; j++){
      if(document.getElementById("cell"+(i+1)+(j+1)).className=="tile"+(i*n+j+1)){continue;}
      else {flag=0;break;}
    }
  }
  return flag;
}

//after every move made by user
function moveMade(m,n){
    //start timer at the first move
    if(start==0){
        shuffle(m,n);
        startTimer();
        start=1;
    }
    addMove();
    if(isWin(m,n)){
        stopTimer();
        alert("Congrats! Puzzle solved in "+time+"s and "+moves+" moves.");
        if (window.localStorage.getItem("bestMoves")) {
          if(Number(window.localStorage.getItem("bestMoves"))>moves){
            window.localStorage.setItem("bestMoves",JSON.stringify(moves));
            document.getElementById("bestMovesDisplay").innerHTML="Best Moves: "+moves;
          }
        } else {
          window.localStorage.setItem("bestMoves",JSON.stringify(moves));
          document.getElementById("bestMovesDisplay").innerHTML="Best Moves: "+moves;
        }
        if (window.localStorage.getItem("bestTime")) {
          if(Number(window.localStorage.getItem("bestTime"))>time){
            window.localStorage.setItem("bestTime",JSON.stringify(time));
            document.getElementById("bestTimeDisplay").innerHTML="Best Time: "+time+"s";
          }
        } else {
          window.localStorage.setItem("bestTime",JSON.stringify(time));
          document.getElementById("bestTimeDisplay").innerHTML="Best Time: "+time+"s";
        }
        location.reload();
    }
}
function startTimer(){
    time=0;
    timer==setInterval(changeTime,1000);
}
function stopTimer(){
    clearInterval(timer);
}
function changeTime(){
    time++;
    document.getElementById("timeDisplay").innerHTML="Time: "+time+"s";
    
}
function addMove(){
  moves++;
  document.getElementById("MovesDisplay").innerHTML="Moves: "+moves;
}
