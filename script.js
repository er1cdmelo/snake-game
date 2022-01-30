
// Cria um novo cookie
// Parâmetro 1 é o nome do cookie
// Parâmetro 2 é o valor do cookie
function cria_cookie(nome, valor) {
    // Cria uma data 01/01/2020
    var data = new Date(2025,0,01);
    // Converte a data para GMT
    data = data.toGMTString();
    // Codifica o valor do cookie para evitar problemas
    valor = encodeURI(valor);
    // Cria o novo cookie
    document.cookie = nome + '=' + valor + '; expires=' + data + '; path=/';
}

// Apaga o cookie
// Envie o nome do cookie como parâmetro
function apaga_cookie(nome){
    // Cria uma data no passado 01/01/2010
    var data = new Date(2010,0,01);
    // Converte a data para GMT
    data = data.toGMTString();
    // Tenta modificar o valor do cookie para a data expirada
    // Assim ele será apagado
    document.cookie = nome + '=; expires=' + data + '; path=/';
}

// Obtém o valor de um cookie
// Envie o nome do cookie como parâmetro
function valor_cookie(nome_cookie) {
    // Adiciona o sinal de = na frente do nome do cookie
    var cname = ' ' + nome_cookie + '=';
    
    // Obtém todos os cookies do documento
    var cookies = document.cookie;
    
    // Verifica se seu cookie existe
    if (cookies.indexOf(cname) == -1) {
        return false;
    }
    
    // Remove a parte que não interessa dos cookies
    cookies = cookies.substr(cookies.indexOf(cname), cookies.length);

    // Obtém o valor do cookie até o ;
    if (cookies.indexOf(';') != -1) {
        cookies = cookies.substr(0, cookies.indexOf(';'));
    }
    
    // Remove o nome do cookie e o sinal de =
    cookies = cookies.split('=')[1];
    
    // Retorna apenas o valor do cookie
    return decodeURI(cookies);
}


let cookiescore = document.cookie

cookiescore = cookiescore.substring(10);

console.log(' aqui = ' + cookiescore);

let highscore = cookiescore;

if(highscore === false){highscore = 0}
console.log(highscore);



// Cria cookie












let newHighscore = highscore;
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let points = 0;

document.getElementById('highscore').innerHTML = newHighscore;
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}




function criarBG() {
    context.fillStyle = "black"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over. F5 to Play Again')
        }
    }
    
    
    criarBG();
    criarCobrinha();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        points+= 100;
        document.getElementById('score-num').innerHTML = points;
        console.log('score: ' + points)

    }

    if(points > Number.parseInt(highscore, 10)){
        highscore = points.toString();
        console.log('NEW HIGHSCORE');
        cria_cookie('highscore', `${points}`);
        console.log('highscore: ' + highscore);
        document.getElementById('highscore').innerHTML = highscore;
        document.getElementById('highscore').style.color = '#fccf03';
        document.getElementById('title').innerHTML = "NEW HIGHSCORE!!"
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

console.log(highscore)


let jogo = setInterval(iniciarJogo, 100);
