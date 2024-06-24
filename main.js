let box = document.querySelectorAll('.box')
let game = [false, false, false, false, false, false, false, false, false]
let proximo = 'x'
let win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

let _2players = document.getElementById('2-players')
let _1player = document.getElementById('1-player')

let tipo = 0



_2players.addEventListener('click', () => {
    tipo = 2
})
_1player.addEventListener('click', () => {
    tipo = 1
})

box.forEach((el, index) => {
    el.addEventListener('click', () => {
        if(tipo != 0) click(el, index);
    })
})



function click(elem, index){
    if(!game[index]){
        game[index] = proximo;
        console.log(elem)
        let newSpan = document.createElement('span')
        if(proximo == 'x'){
            newSpan.textContent = 'x';
            newSpan.classList.add('x');
            elem.appendChild(newSpan);
            if(verificaJogo()){
                finalizarGame()
            }else{
                proximo = 'o'
                if(tipo == 1){
                    let nia = ia()
                    console.log(nia)
                    console.log(box[nia])
                    click(box[nia], nia);
                    proximo = 'x'
                }
            }
        }else{
            newSpan.classList.add('o');
            console.log(elem)
            elem.appendChild(newSpan);
            if(verificaJogo()){
                finalizarGame()
            }else{
                proximo = 'x'
            }
        }
    }
}


function verificaJogo(){
    let quantFalse = game.filter(item => item == false).length;
    if(quantFalse < 5 && quantFalse > 0){
        let indices = [];
        game.forEach((item, ind) => {
        if (item === proximo) {
            indices.push(ind);
        }
    })
    return win.some(subset => subset.every(element => indices.includes(element)));
    }
    else if(quantFalse == 0){
        mensagem('Deu velha')
    }
}

function finalizarGame(){
    let scoreboard;
    let nScoreboard;
    if(proximo == 'x'){
        scoreboard = document.getElementById('scoreboard-1')
        nScoreboard = Number(scoreboard.textContent)
        nScoreboard += 1;
        scoreboard.textContent = nScoreboard;
    }else{
        scoreboard = document.getElementById('scoreboard-2')
        nScoreboard = Number(scoreboard.textContent)
        nScoreboard += 1;
        scoreboard.textContent = nScoreboard;
    }
    mensagem(`${proximo} ganhou!`)
}

function mensagem(msg){
    let message = document.getElementById('pmessage')
    message.textContent = msg
    tipo = 0;
    setTimeout(() => {
        iniciarGame();
        message.textContent = '';
    }, 4000);
}

function iniciarGame(){
    box.forEach((el) => {
        el.innerHTML = ''
    })
    for(let i in game){
        game[i] = false
    }
    proximo = 'x'
}


function ia(){
    let aleatorio = Math.floor(Math.random() * 8)
    if(game[aleatorio] == false){
        return aleatorio
    }else{
        return ia()
    }
}