
class Player {
	constructor(name, symbol) {
		this.name = name,
		this.symbol = symbol
	}
}

const Board = ( () => {
	const boardArray = [null, null, null, null, null, null, null, null, null];
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
    
	function render() {
		const boardDiv = document.getElementById('board');
		const cells = document.getElementsByClassName("sqr");
		if (cells.length === 0){
			for (let i=0; i<boardArray.length; i++) {
			let div = document.createElement("div");
			div.classList.add("sqr");
			div.id = `${i}`;
			boardDiv.appendChild(div);
		   } 	
		}else{
			for (let i=0; i< cells.length; i++){
				cells[i].innerText = "";
				cells[i].style.removeProperty('background-color');
			}
		}
		
		
	}

	function checkWinner(symb){
		var plays = this.boardArray.reduce((acc,val,index)=>
			val === symb ? acc.concat(index):acc,[]);
	
		let won = winCombinations.reduce(function verify(acc,elm){
			if (elm.every((val) => plays.indexOf(val) > -1 ))
				acc = elm;	
            return acc
		},[]);

		return won
	}

	function checkTie() {
		return this.boardArray.every(val => val !== null)
	}

	return {boardArray, checkWinner, checkTie, render}
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
	    	board.boardArray = [null, null, null, null, null, null, null, null, null];
	    	msg.innerHTML = "Turn : "+currentPlayer.name;
	    	/*for (let i=0; i< board.boardArray.length; i++) {
	    		let sqr = document.getElementById(`${i}`)
	    		sqr.innerHTML = null;
	    		gameFinished = false;
	    	}*/
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
		let comb = board.checkWinner(currentPlayer.symbol);
		let color = "rgba(255, 99, 71, 0.3)";
		const msgElement = document.getElementById('msg');
		if (comb.length === 3){
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
			
			putSymb(id);
			checkwin_Or_Tie();
			if (!gameFinished){
				changeCurrentPlayer();
				msg.innerHTML = "Turn : "+currentPlayer.name;
			}
			
		}

		
		if ( currentPlayer == player2 && currentPlayer.name === "computer" && !gameFinished){
			delListeners();
			Ia_play()
			checkwin_Or_Tie();
			if (!gameFinished){
				changeCurrentPlayer();
				msg.innerHTML = "Turn : "+currentPlayer.name;
				addListeners();
			}
			
		}
	}

	function first_Spot()
	{
		for(let i = 0; i< board.boardArray.length; i++){
    			if (board.boardArray[i] == null)
    				return i
    		}
    	return null	
	}

	function putSymb(id){
		infoSymb = document.getElementById(id.toString());
		infoSymb.style.fontSize = "30px";
		infoSymb.style.textAlign= "center";
		infoSymb.style.color = "white";
		infoSymb.style.paddingTop = "20px";
		infoSymb.innerHTML = currentPlayer.symbol;			
		board.boardArray[id] = currentPlayer.symbol
	}

    function Ia_play(){
    	let id = first_Spot();
    		if (id != null){
    			if (board.boardArray[id] === null && !gameFinished){
    			 msg.innerHTML = "Turn : Computer";	
				 putSymb(id)
			}
    		}
			
    }

	function start() {
		board.render();
		player1.name = "Humain1";
		player2.name = "Humain2";
		msg.innerHTML = "Turn : "+currentPlayer.name;
		addListeners();
		addNewGameListener();
	}

	function start2() {
		board.render();
		delListeners();
		player1.name = "Humain";
		player2.name = "computer";
		currentPlayer = player2;
		if (currentPlayer == player2){
			Ia_play()
			checkwin_Or_Tie()		
			currentPlayer = player1;
			addListeners();
		}
	}
	return {start,start2}
})

// ------------------------------------------------

function startGame  () {
	document.getElementById("dashBoard").style.display = "none";
	document.getElementById("main").style.display = "block";
	const gameDiv = document.getElementById("game");
	gameDiv.classList.remove("hidden")
	let info = document.getElementById("bouton_1").checked;
	const game = Game();
	
	if (info){
		game.start();
	}
	else
		{
		board.boardArray = [null, null, null, null, null, null, null, null, null];
	    game.start2();
	}
}

function removeElement() {
	var info  = document.getElementById("bouton_1").checked;
    document.getElementById("myTitle").style.display = "none";
    document.getElementById("dashBoard").style.display = "block";
    
}
function backDashboard(){
	msg.innerHTML = "";
	document.getElementById("main").style.display = "none";
	document.getElementById("dashBoard").style.display = "block";
}