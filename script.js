let tour=1;
let symbol="x";
oldSymbol="circle";
if(!JSON.parse(localStorage.getItem("isFirstTime"))){
  console.log("FIRST TIME");
  localStorage.setItem("gameData",JSON.stringify({"x":0,"o":0}));
  localStorage.setItem("isFirstTime",JSON.stringify(true));
  localStorage.setItem("theme","light");
  theme="light";
}
else{
  console.log("NOT FIRST TIME");
}
const gameData=JSON.parse(localStorage.getItem("gameData"));
const winnigMessageTextElement=document.querySelector(".winning-message-text");
const winnigMessageElement=document.querySelector(".winning-message");
const boardElement=document.querySelector(".board");
const themesElement=document.querySelector(".themes");
const xScoreElement=document.getElementById("x-score");
const oScoreElement=document.getElementById("o-score");
const resetDivElement=document.querySelector(".reset-div");
const scoreBoardElement=document.querySelector(".scoreboard");
const boardDataList=[];
const cellElementList=[];
for(let i=1;i<10;i++){
  cellElementList.push(document.getElementById(`cell${i}`));
  boardDataList.push(null);
}
boardElement.classList.add(symbol);

themeManager()
xScoreElement.innerHTML=gameData.x;
oScoreElement.innerHTML=gameData.o;

function draw(index) {
  if(boardDataList[index]===null){
    cellElementList[index].classList.add(symbol);
    boardDataList[index]=symbol;
    if(tour===9){endGame()}
    else{
      if(checkGameOver()){
        endGame();
      }
      else{
        changeSymbol();
        tour+=1;
      }
    }
  }
}

function changeSymbol(){
  if (symbol==="x"){
    symbol="circle";
    oldSymbol="x";
  }
  else{
    symbol="x";
    oldSymbol="circle";
  }
  boardElement.classList.replace(oldSymbol,symbol);
}


function checkGameOver(){
  let mid=boardDataList[4];
  let first=boardDataList[0];
  let last=boardDataList[8];
  if(
    (mid===first)&(mid===last)&(mid!==null)||
    (mid===boardDataList[2])&(mid===boardDataList[6])&(mid!==null)||
    (mid===boardDataList[1])&(mid===boardDataList[7])&(mid!==null)||
    (mid===boardDataList[3])&(mid===boardDataList[5])&(mid!==null)||
    (first===boardDataList[1])&(first===boardDataList[2])&(first!==null)||
    (first===boardDataList[3])&(first===boardDataList[6])&(first!==null)||
    (last===boardDataList[2])&(last===boardDataList[5])&(last!==null)||
    (last===boardDataList[6])&(last===boardDataList[7])&(last!==null)
  ){
    return true;
  }
  else{
    return false;
  }
}




function endGame(){
  let msg;
  if(tour===9 & !(checkGameOver())){msg="Draw";}
  else{

  if(oldSymbol!=="x"){
    msg="X wins!";
    gameData.x++;
  }
  else{
    msg="O Wins!";
    gameData.o++;
  }
}

  
  winnigMessageTextElement.innerHTML=msg;
  winnigMessageElement.classList.add("show");
  localStorage.setItem("gameData",JSON.stringify(gameData));
  xScoreElement.innerHTML=gameData.x;
  oScoreElement.innerHTML=gameData.o;
}
 
function restartGame(){
  winnigMessageElement.classList.remove("show");
  for(let i=0;i<9;i++){
    cellElementList.push(document.getElementById(`cell${i}`));
    boardDataList[i]=(null);
    symbol="x";
    oldSymbol="circle"
}
cellElementList.forEach(myFunc);
function myFunc(item){
  if(item!==null){
  item.className="cell";}
}

boardElement.classList.add(symbol);
tour=1;
}

function themeManager(){
  theme=localStorage.getItem("theme");
  if(theme==="dark"){
    notTheme="light";
    document.body.style.backgroundColor="rgb(36, 36, 36)";
  }
  else{
    notTheme="dark";
    document.body.style.backgroundColor="white";
  }
  resetDivElement.classList.remove(notTheme);
  resetDivElement.classList.add(theme);
  scoreBoardElement.classList.remove(notTheme);
  scoreBoardElement.classList.add(theme);
  themesElement.classList.remove(notTheme);
  themesElement.classList.add(theme);
  boardElement.classList.remove(notTheme);
  boardElement.classList.add(theme);
}

function darkTheme(){
  localStorage.setItem("theme","dark");
 
  themeManager();
}


function lightTheme(){
  localStorage.setItem("theme","light");
  themeManager();
  
 

}

let resetButtonElement = resetDivElement.firstChild;
resetButtonElement.addEventListener("click",()=>{
  gameData.x=0;
  gameData.o=0;
  localStorage.setItem("gameData",JSON.stringify(gameData));
  xScoreElement.innerHTML=gameData.x;
  oScoreElement.innerHTML=gameData.o;
})
