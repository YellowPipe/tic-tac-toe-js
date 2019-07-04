const Player = (name,symbol) => {

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
		for (let i=0; i<boardArray.length; i++) {
			let div = document.createElement("div");
			div.classList.add("sqr");
			div.id = `${i}`;
			boardDiv.appendChild(div);
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

    const addNewGameListener = () => {
    	newGame.addEventListener('click', () => {
	    	board.boardArray = [null, null, null, null, null, null, null, null, null];
	    	for (let i=0; i<board.boardArray.length; i++) {
	    		let sqr = document.getElementById(`${i}`)
	    		sqr.innerHTML = null;
	    		sqr.style.color = "black";
	    		msg.innerHTML = "";
	    		gameFinished = false;
	    	}
    	})
    }

    const addListeners = (game) => {
		const sqrs = document.getElementsByClassName("sqr");
		for(let i = 0; i<sqrs.length; i++) {
			sqrs[i].addEventListener('click', function(e){move(e)})
		}
	};

    let symb = 'O';
    const whichSymb = () =>{symb === 'O'? symb='X':symb='O'}

	const move = (e) => {
		whichSymb();
		let id = Number(e.target.id);
		if (board.boardArray[id] === null && !gameFinished){
			e.target.innerHTML = symb;			
			board.boardArray[id] = symb
		}
		let comb = board.checkWinner(symb);
		const msgElement = document.getElementById('msg');
		if (comb.length != 0){
			msg.innerHTML = "You won!"
			comb.forEach(function(elm) {
				info = document.getElementById(elm.toString());
				info.style.color = 'red'
				gameFinished = true;
			} )
		} else {
			if(board.checkTie()) {
				msg.innerHTML = "It's a tie"
				gameFinished = true;
			}
		}
	}

	function start() {
		board.render()
		addListeners()
		addNewGameListener()
	}

	return {start}
})

// ------------------------------------------------

const game = Game();
game.start()

