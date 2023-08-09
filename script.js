
let board = ["", "", "", "", "", "", "", "", ""];
let isRobotGame = false;
let isDumbGame = false;
let modesave = "";
let boardactive = true;
let isRobotProMaxGame = false;
let isDumbProMaxGame = false;

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

let currentPlayer = "O"

let OText = "O"
let XText = "X"

document.getElementById("reset").style.display = "none";
document.getElementById("inputer1").style.display = "none";
document.getElementById("inputer2").style.display = "none";


function startGame(mode) {
  
  OText = document.getElementById("inputer1").value
  XText = document.getElementById("inputer2").value

  currentPlayer = OText;

  modesave = mode
  isRobotGame = (mode === "robot");

  isRobotProMaxGame = (mode === "robotvsrobot");

  isDumbGame = (mode === "idiot");

  isDumbProMaxGame = (mode === "idiotvsidiot");

  document.getElementById("inputer1").style.display = "block";
  document.getElementById("inputer2").style.display = "block";
  


  document.getElementById("image").style.display = "none";

  document.getElementById("reset").style.display = "block";
 
  document.getElementById("board").style.display = "grid";
  if (mode === "robot") {
    document.querySelector("h1").innerHTML = "當前模式: 單人模式";
  }

  if (mode === "robotvsrobot") {
    document.querySelector("h1").innerHTML = "當前模式: 人工智慧間的對決";
    makeMove(document.getElementById("A"+String(parseInt(Math.random()*3 + 1))+String(parseInt(Math.random()*3 + 1))))
  } 
  if (mode === "human") {
    document.querySelector("h1").innerHTML = "當前模式: 雙人模式";
  }

  if (mode === "idiot") {
    document.querySelector("h1").innerHTML = "當前模式: 成就感模式";
  }

  if (mode === "idiotvsidiot") {
    document.querySelector("h1").innerHTML = "當前模式: 人工智障間的對決";
    makeMove(document.getElementById("A"+String(parseInt(Math.random()*3 + 1))+String(parseInt(Math.random()*3 + 1))))
  }
}

function makeMove(cell) {

  OText = document.getElementById("inputer1").value
  XText = document.getElementById("inputer2").value

  if (boardactive) {
    const index = Array.from(cell.parentNode.children).indexOf(cell);

  if (board[index] === "") {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      
        document.querySelector("h1").innerHTML = currentPlayer + " 勝利！";
        boardactive = false
      
    } else if (checkDraw()) {
       
        document.querySelector("h1").innerHTML = "平手!";
        boardactive = false
      
    } else {
      currentPlayer = (currentPlayer === OText) ? XText : OText;
      if (isRobotGame && currentPlayer === XText) {
        makeRobotMove();
      }
    
      if (isRobotProMaxGame && currentPlayer === XText) {
        makeRobotMove();
      }

      if (isRobotProMaxGame && currentPlayer === OText) {
        makeRobotMove2();
      }





      if (isDumbGame && currentPlayer === XText) {

       makeDumbMove();

      }
    
      if (isDumbProMaxGame && currentPlayer === XText) {
        makeDumbMove();
      }

      if (isDumbProMaxGame && currentPlayer === OText) {
        makeDumbMove2();
      }


    }
        
  }
  }
}

function resetBoard() {
    OText = document.getElementById("inputer1").value
    XText = document.getElementById("inputer2").value
    boardactive = true
    currentPlayer = OText;
    board = ["", "", "", "", "", "", "", "", ""];
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.textContent = "");



    if (modesave === "robot") {
        document.querySelector("h1").innerHTML = "當前模式: 單人模式";
      }
    
      if (modesave === "robotvsrobot") {
        document.querySelector("h1").innerHTML = "當前模式: 人工智慧間的對決";
        makeMove(document.getElementById("A"+String(parseInt(Math.random()*3 + 1))+String(parseInt(Math.random()*3 + 1))))
      } 
      if (modesave === "human") {
        document.querySelector("h1").innerHTML = "當前模式: 雙人模式";
      }
    
      if (modesave === "idiot") {
        document.querySelector("h1").innerHTML = "當前模式: 成就感模式";
      }
    
      if (modesave === "idiotvsidiot") {
        document.querySelector("h1").innerHTML = "當前模式: 人工智障間的對決";
        makeMove(document.getElementById("A"+String(parseInt(Math.random()*3 + 1))+String(parseInt(Math.random()*3 + 1))))
      }
    
  }




function minimax(newBoard, player) {
    const availableMoves = emptyCells(newBoard);
  
    if (checkWin(XText, newBoard)) {
      return { score: -10 };
    } else if (checkWin(OText, newBoard)) {
      return { score: 10 };
    } else if (availableMoves.length === 0) {
      return { score: 0 };
    }
  
    const moves = [];
  
    for (let i = 0; i < availableMoves.length; i++) {
      const move = {};
      move.index = availableMoves[i];
  
      newBoard[availableMoves[i]] = player;
  
      if (player === OText) {
        const result = minimax(newBoard, XText);
        move.score = result.score;
      } else {
        const result = minimax(newBoard, OText);
        move.score = result.score;
      }
  
      newBoard[availableMoves[i]] = "";
  
      moves.push(move);
    }
  
    let bestMove;
    if (player === OText) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

function checkWin(player) {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 水平
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 垂直
      [0, 4, 8], [2, 4, 6] // 對角線
    ];
  
    for (const combo of winningCombos) {
      if (board[combo[0]] === player && board[combo[1]] === player && board[combo[2]] === player) {
        return true;
      }
    }
    return false;
  }
  
  function checkDraw() {
    return board.every(cell => cell !== "");
  }
  
 
  async function makeRobotMove() {
    await delay(0.3);
    const bestMove = minimax(board, XText).index;
    const cell = document.getElementById("board").children[bestMove];
    makeMove(cell);
  }

  async function makeDumbMove() {
    await delay(0.3);
    
    let randmmove = emptyCells(board)[parseInt(Math.random()*emptyCells(board).length)]
    let get = false

    if (randmmove == "1") {
        get = true
        makeMove(document.getElementById("A21"))
    }
    if (randmmove == "2") {
        get = true
        makeMove(document.getElementById("A31"))
    }
    if (randmmove == "3") {
        get = true
        makeMove(document.getElementById("A12"))
    }
    if (randmmove == "4") {
        get = true
        makeMove(document.getElementById("A22"))
    }
    if (randmmove == "5") {
        get = true
        makeMove(document.getElementById("A32"))
    }
    if (randmmove == "6") {
        get = true
        makeMove(document.getElementById("A13"))
    }
    if (randmmove == "7") {
        get = true
        makeMove(document.getElementById("A23"))
    }
    if (randmmove == "8") {
        get = true
        makeMove(document.getElementById("A33"))
    }

    if (get) {
        
    } else {
        makeMove(document.getElementById("A11"))
    }


  }

  async function makeDumbMove2() {
    await delay(0.3);
    
    let randmmove = emptyCells(board)[parseInt(Math.random()*emptyCells(board).length)]
    let get = false
    if (randmmove == "1") {
        get = true
        makeMove(document.getElementById("A21"))
    }
    if (randmmove == "2") {
        get = true
        makeMove(document.getElementById("A31"))
    }
    if (randmmove == "3") {
        get = true
        makeMove(document.getElementById("A12"))
    }
    if (randmmove == "4") {
        get = true
        makeMove(document.getElementById("A22"))
    }
    if (randmmove == "5") {
        get = true
        makeMove(document.getElementById("A32"))
    }
    if (randmmove == "6") {
        get = true
        makeMove(document.getElementById("A13"))
    }
    if (randmmove == "7") {
        get = true
        makeMove(document.getElementById("A23"))
    }
    if (randmmove == "8") {
        get = true
        makeMove(document.getElementById("A33"))
    }

    if (get) {
        
    } else {
        makeMove(document.getElementById("A11"))
    }



  }

  async function makeRobotMove2() {
    await delay(0.3);
    const bestMove = minimax(board, OText).index;
    const cell = document.getElementById("board").children[bestMove];
    makeMove(cell);
  }





function emptyCells(board) {
    return board.reduce((acc, cell, index) => {
      if (cell === "") {
        acc.push(index);
      }
      return acc;
    }, []);
  }