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
	// function render() {
	// 	const boardDiv = document.getElementById('board');
	// 	// const squares = document.getElementsByClassName
	// 	for (let i=0; i<boardArray.length, i++) {
	// 		let square = document.getElementById(`sqr${i}`)
	// 		square.innerHTML = boardArray[i]
	// 	}
	// }

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

	}

	return {boardArray,checkWinner}

} )	

const deleteListeners = (game) => {
	const sqrs = document.getElementsByClassName("sqr");
	for(let i = 0; i<sqrs.length; i++) {
		sqrs[i].EventListener('click', function(e){game.move(e)})
	}
};


const Game = ( () => {
	const board = Board()
    
	const move = (e) => {
		whichSymb();
		let id = Number(e.target.id);
		if (board.boardArray[id] === null){
			e.target.innerHTML = symb;			
			board.boardArray[id] = symb
		}
		let comb = board.checkWinner(symb);
		if (comb.length != 0){
			
			comb.forEach(function(elm) {
				info = document.getElementById(elm.toString());
				info.style.color = 'red'
			} )
			//deleteListeners(this.game);
		}
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

};

(function () {
    // logic here
    const game = Game();
    addListeners(game)
})();