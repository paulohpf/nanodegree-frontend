// Enemies our player must avoid
var Enemy = function(x, y , speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; // Eixo X
    this.y = y; // Eixo Y
    this.speed = speed; // Velocidade

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + (this.speed * dt); // Multiplico a velocidade no Eixo X

    // Verifico a colisão nos inimigos
    if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && player.y + 30 > this.y) {
        player.x = 200;
        player.y = 380;
    }

    // Quando o inimigo terminar de atravessar a tela
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random()*186);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.wins = 0;
    this.sprite = 'images/char-boy.png';
}

// Não permito que o jogador atravesse o canvas
Player.prototype.update = function() {
    if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    }

    if (this.y > 380) {
        this.y = 380;

    // Se o jogar ganhar
    } else if (this.y < 0) {
        this.wins++;
        if(this.wins <= 1){
            alert(`Parabéns, você atravesou ${this.wins} vez`);
        } else {
            alert(`Parabéns, você atravesou ${this.wins} vezes`);
        }
        this.y = 380;
        this.x = 200;
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(tecla) {
    if (tecla == 'left') {
        this.x = this.x - (this.speed + 50);
    } else if (tecla == 'right') {
        this.x = this.x + (this.speed + 50);
    } else if (tecla == 'up') {
        this.y = this.y - (this.speed + 30);
    } else if (tecla == 'down') {
        this.y = this.y + (this.speed + 30);
    }
}

    
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(y){
    enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
}); 


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
