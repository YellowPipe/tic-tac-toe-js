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
		e.target.innerHTML = 'X'
		let id = Number(e.target.id);
		board.boardArray[id] = 'X'
		// console.log(boardArray)
	}
	return {board, move}
})

const addListeners = (game) => {
	const sqrs = document.getElementsByClassName("sqr");
	for(let i = 0; i<sqrs.length; i++) {
		sqrs[i].addEventListener('click', function(e){game.move(e)})
	}
}

const startGame = () => {
	const game = Game();
	addListeners(game)
}



startGame()