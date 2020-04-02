let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let intervalo = 150;

let fundo = 'gray';
let corCobrinha = 'black';
let corCabeca = 'green';

let corAlimento = 'red';

let direita = 'right';
let esquerda = 'left';
let cima = 'up';
let baixo = 'down';

//criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

let direction = direita;

let alimento = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//cria o plano de fundo do jogo
function criarBackGround() {
    context.fillStyle = fundo;
    //desenha o retângulo usando x e y e a largura e altura setadas
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//cria a cobrinha
function criarSnake() {
    for (i = 0; i < snake.length; i++) {
        if (snake.length == 1)
            context.fillStyle = corCabeca;
        else
            context.fillStyle = corCobrinha;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//alimenta a cobrinha
function alimentar() {
    context.fillStyle = corAlimento;
    context.fillRect(alimento.x, alimento.y, box, box);
}

document.addEventListener('keydown', movimentar);

//atualiza o estado da cobrinha no jogo
function movimentar(event) {
    if ((event.keyCode == 37 || event.keyCode == 65 || event.keyCode == 100) && direction != direita) direction = esquerda;
    if ((event.keyCode == 38 || event.keyCode == 87 || event.keyCode == 104) && direction != baixo) direction = cima;
    if ((event.keyCode == 39 || event.keyCode == 68 || event.keyCode == 106) && direction != esquerda) direction = direita;
    if ((event.keyCode == 40 || event.keyCode == 83 || event.keyCode == 98) && direction != cima) direction = baixo;
}

//inicia o jogo
function iniciarJogo() {
    if (snake[0].x >= 16 * box && direction == direita) snake[0].x = 0;
    if (snake[0].x < 0 * box && direction == esquerda) snake[0].x = 16 * box;
    if (snake[0].y >= 16 * box && direction == baixo) snake[0].y = 0;
    if (snake[0].y < 0 * box && direction == cima) snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBackGround();
    criarSnake();
    alimentar();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == direita) snakeX += box;
    if (direction == esquerda) snakeX -= box;
    if (direction == cima) snakeY -= box;
    if (direction == baixo) snakeY += box;

    if (snakeX != alimento.x || snakeY != alimento.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        alimento.x = Math.floor(Math.random() * 15 + 1) * box;
        alimento.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //unshift adiciona como primeiro quadradinho da cobrinha
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, intervalo);
