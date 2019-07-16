
class Player {
	constructor(name, symbol) {
		this.name = name,
		this.symbol = symbol,
		this.moves = []
	}

	checkWin (board) {
		for (let i=0; i<board.winCombinations.length; i++) {
			let counter = 0
			for (let j=0; j<3; j++) {
				if (this.moves.some((val) => val === board.winCombinations[i][j])) {
					counter+=1
				}
				if (counter === 3) {
					return board.winCombinations[i]
				}
			}
		}
	}
}

const Board = ( () => {
	const boardArray = new Array(9).fill(null);
	const winCombinations = [
					[0,1,2],
					[3,4,5],
					[6,7,8],
					[0,3,6],
					[1,4,7],
					[2,5,8],
					[0,4,8],
					[6,4,2]
					];

	function checkTie() {
		return this.boardArray.every(val => val !== null)
	}

	return {boardArray, checkTie, winCombinations}
})	


const Game = ( () => {
	let gameFinished = false;
	const msg = document.getElementById("msg")
	const newGame = document.getElementById("newGame");
	const board = Board();
	const player1 = new Player("Humain1", "X");
	const player2 = new Player("Humain2", "O");
	let currentPlayer = player1;
    

    const addNewGameListener = () => {
    	newGame.addEventListener('click', () => {
	    	board.boardArray = new Array(9).fill(null);
	    	msg.innerHTML = "Turn : "+currentPlayer.name;
    	})

    }
    const delListeners= (game) => {
		const sqrs = document.getElementsByClassName("sqr");
		for(let i = 0; i<sqrs.length; i++) {
			sqrs[i].removeEventListener('click', function(e){move(e)})
		}
	};
    const addListeners = (game) => {
		const sqrs = document.getElementsByClassName("sqr");
		for(let i = 0; i<sqrs.length; i++) {
			sqrs[i].addEventListener('click', function(e){move(e)})
		}
	};

	function checkwin_Or_Tie(){
		let comb = currentPlayer.checkWin(board);
		let color = "rgba(255, 99, 71, 0.3)";
		const msgElement = document.getElementById('msg');
		if (comb){
			msg.innerHTML = "";
			msg.innerHTML = `${currentPlayer.name} won!`
			comb.forEach(function(elm) {
				let infoCell = document.getElementById(elm.toString());
				infoCell.style.backgroundColor = color;
				gameFinished = true;
			} )
		} else {
			if(board.checkTie()) {
				msg.innerHTML = "It's a tie"
				gameFinished = true;
			}
		}
	}
	
    const changeCurrentPlayer = () => {currentPlayer = currentPlayer === player2 ? player1 : player2}

	const move = (e) => {
		let id = Number(e.target.id);
		if (board.boardArray[id] === null && !gameFinished){
			msg.innerHTML = "Turn : "+currentPlayer.name;
			putSymb(id);
			checkwin_Or_Tie();
			if (!gameFinished){
				changeCurrentPlayer();
				msg.innerHTML = "Turn : "+currentPlayer.name;
			}
			
		}

		
		if ( currentPlayer == player2 && currentPlayer.name === "Computer" && !gameFinished){
			delListeners();
			AI_play()
			checkwin_Or_Tie();
			if (!gameFinished){
				changeCurrentPlayer();
				msg.innerHTML = "Turn : "+currentPlayer.name;
				addListeners();
			}
			
		}
	}
	function putSymb(id){
		infoSymb = document.getElementById(id.toString());
		infoSymb.style.fontSize = "30px";
		infoSymb.style.textAlign= "center";
		infoSymb.style.color = "white";
		infoSymb.style.paddingTop = "20px";
		infoSymb.innerHTML = currentPlayer.symbol;			
		currentPlayer.moves.push(Number(id));
		board.boardArray[id] = currentPlayer.symbol
	}

    function AI_play(){
    	let id = 4;
    	while (board.boardArray[id] !== null) {
    		id = Math.floor(Math.random() * 9)
    	}
		if (!gameFinished) {
			msg.innerHTML = "Turn : Player";	
			putSymb(id)
		}
    }

	function start() {
		render(board);
		player1.name = "Player 1";
		player2.name = "Player 2";
		currentPlayer= player1;
		msg.innerHTML = "Turn : "+currentPlayer.name;
		addListeners();
		addNewGameListener();
	}

	function start2() {
		render(board);
		delListeners();
		player1.name = "Player";
		player2.name = "Computer";
		currentPlayer = player2;
		gameFinished = false;
		AI_play()
		checkwin_Or_Tie()		
		currentPlayer = player1;
		addListeners();
	}
	return {start,start2}
})

// ------------------------------------------------

function startGame  () {
	document.getElementById("dashBoard").style.display = "none";
	document.getElementById("main").style.display = "block";
	const gameDiv = document.getElementById("game");
	gameDiv.classList.remove("hidden")
	let info = document.getElementById("button_1").checked;
	const game = Game();
	
	if (info){
		game.start();
	}
	else
		{
		board.boardArray = new Array(9).fill(null);
	    game.start2();
	}
}

function removeElement() {
	var info  = document.getElementById("button_1").checked;
    document.getElementById("myTitle").style.display = "none";
    document.getElementById("dashBoard").style.display = "block";
    
}
function backDashboard(){
	msg.innerHTML = "";
	document.getElementById("main").style.display = "none";
	document.getElementById("dashBoard").style.display = "block";
}

const render = (board) => {
	const boardDiv = document.getElementById('board');
	const cells = document.getElementsByClassName("sqr");
	//if the matrix is already drawn
	if (cells.length === 0){
	   board.boardArray.forEach(function(item, i){
  			let div = document.createElement("div");
			div.classList.add("sqr");
			div.id = `${i}`;
			boardDiv.appendChild(div);
		}); 	
	}else{
		 board.boardArray.forEach(function(item,i){
			cells[i].innerText = "";
			cells[i].style.removeProperty('background-color');
		});
	}
}