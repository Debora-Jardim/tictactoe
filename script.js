const statusDisplay = document.querySelector('.game-status'); 
let gameOn = true;  //comeca com um boolean pra poder fazer os argumentos depois, nas funcoes
let currentPlayer = "X"; //definindo um dos players 
let gameStatus = [
                 "", "", "",
                 "", "", "", 
                 "", "", ""
                ]
                 ; //isso aqui eh o array do tabuleiro

function winMessage() {
    // console.log = ('Player' + '' + currentPlayer + '' + 'has won');
    return `Player ${currentPlayer} has won`;
}
function tieMessage() {
    // console.log = (`It's a tie`)
    return 'It`s' + ' ' +  'a tie'
}    
function getPlayer(){
    // console.log("it's" + currentPlayer + "'s turn");
    return `it's ${currentPlayer}'s turn`;
}
//sempre comecar o script declarando as variaveis porque eh com elas que vou montar argumentos
 

statusDisplay.innerHTML = getPlayer(); 

/*
 0 | 1 | 2
 3 | 4 | 5
 6 | 7 | 8
*/
const winningConditions = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // lines
    [0, 3, 6],[1, 4, 7],[2, 5, 8], //columns
    [0, 4, 8],[2, 4, 6] //diagonals
]; //isso aqui eh uma array com outra array dentro guardando todas as possiveis combinacoes do tabuleiro.

function handleCellPlayed(celulaClicada, indiceDaCelulaClicada) {
    gameStatus[indiceDaCelulaClicada] = currentPlayer; //bracket notation pra pegar o gamestatus daquela posição/índice
    celulaClicada.innerHTML = currentPlayer; // trocar o valor da célula clicada por X ou O
} 

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; //qual eh dos dois pontinhos na sintaxe?

    /*
   
    const jogadorAtual = "X"; //currentPlayer
    if(jogadorAtual === "X") {
        jogadorAtual = "O";
    } else {
        jogadorAtual = "X";
    }

    */

    statusDisplay.innerHTML = getPlayer(); // isso vai trocar o game-status dentro do HTML pelo valor do jogar atual (X ou O)
} //uma funcao atrelada a um elemento do html? 

function handleResultValidation() { //essa funcao inicia a acao do jogo partindo do pressuposto que a rodada NAO foi vencida
    let roundWon = false;
    for (let i = 0; i < 8; i++) { //São as 8 possibilidades de vitória aqui (veja que winningConditions.lenght é igual a 8)

/*
 0 | 1 | 2
 3 | 4 | 5
 6 | 7 | 8
*/
/*

const winningConditions = [
 0 ->  [0, 1, 2],
 1 ->  [3, 4, 5],
 2 ->  [6, 7, 8], // lines
 3 ->  [0, 3, 6],
 4 ->  [1, 4, 7],
 5 ->  [2, 5, 8], //columns
 6 ->  [0, 4, 8],
 7 ->  [2, 4, 6] //diagonals
]; //isso aqui eh uma array com outra array dentro guardando todas as possiveis combinacoes do tabuleiro.


let gameStatus = [
                 "X", "O", "",
                 "X", "X", "", 
                 "X", "O", ""
                ]
*/


        // see i=4, winningConditions[4] == [1,4,7];
        const combinacao = winningConditions[i];
        // winCondition = [1,4,7];
        //                 0 1 2
        let posicao0daCombinacao = combinacao[0];

        let celula1 = gameStatus[posicao0daCombinacao]; // combinacao[0] = 1 gameStatus[1]
        let celula2 = gameStatus[combinacao[1]]; // combinacao[1] = 4 gameStatus[4]
        let celula3 = gameStatus[combinacao[2]]; // combinacao[2] = 7 gameStatus[7]
/*
        let a = gameStatus[1]; = O
        let b = gameStatus[4]; = X
        let c = gameStatus[7]; = O
        */

        if (celula1 === '' || celula2 === '' || celula3 === '') { 
            continue; 
        } else  
        if (celula1 === celula2 && celula2 === celula3) { //this one means will be true if and ONLY IF  all the operands are true . Otherwise it will be false
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameStatus.includes(""); // se o gameStatus não (exclamação) incluir o valor vazio = se não tiver espaço pra jogar
    if (roundDraw) { // empate
        statusDisplay.innerHTML = tieMessage(); //mensagem de empate
        gameActive = false; //desliga o jogo
        return; //volta
    }

    handlePlayerChange(); //ainda tem jogo, bora trocar o jogador
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); //

    if (gameStatus[clickedCellIndex] !== "" || !gameOn) {
        return;
    }  

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
} 

function handleRestartGame() {
    gameOn = true;
    currentPlayer = "X";
    gameStatus = ["", "", "", "", "", "", "", "", ""]; 
    statusDisplay.innerHTML = getPlayer();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
/*

for(let i = 0 ; i< document.querySelectorAll('.cell').lenght ; i++) {
    let cell = document.querySelectorAll('.cell')[i];
    cell.addEventListener('click', handleCellClick);
}

// Sem loop for:
let celula1 = document.querySelector('.celula1')
celula1.addEventListener('click', handleCellClick);
celula2.addEventListener('click', handleCellClick);
...
...
celula9.addEventListener('click', handleCellClick);

*/
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);

