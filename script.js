const Player = (name,symbol) => {

}
const Board = ( () => {
	const boardArray = [null, null, null, null, null, null, null, null, null];
	const winCombinations = [];
	// function render() {
	// 	const boardDiv = document.getElementById('board');
	// 	// const squares = document.getElementsByClassName
	// 	for (let i=0; i<boardArray.length, i++) {
	// 		let square = document.getElementById(`sqr${i}`)
	// 		square.innerHTML = boardArray[i]
	// 	}
	// }

	function checkWinner(){

	}

	function checkTie() {

	}

	return {boardArray}

} )	

const Game = ( () => {
	const board = Board()
    
	const move = (e) => {
		whichSymb();
		let id = Number(e.target.id);
		if (board.boardArray[id] === null){
			e.target.innerHTML = symb;			
			board.boardArray[id] = symb
		}
		//check_Win_Or_Tie()
	}
    let symb = 'O';
    const whichSymb = () =>{symb === 'O'? symb='X':symb='O'}
	return {board, move}
})

const addListeners = (game) => {
	const sqrs = document.getElementsByClassName("sqr");
	for(let i = 0; i<sqrs.length; i++) {
		sqrs[i].addEventListener('click', function(e){game.move(e)})
	}

}


(function () {
    // logic here
    const game = Game();
    addListeners(game)
})();