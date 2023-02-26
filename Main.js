function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Game {

    constructor({width = 0, height = 0}) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = width || window.innerWidth;
        this.height = height || window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.animationFrame = null;

        this.players = [
            new Player({x: 100, y: 200, radius: 10, color: "black", up: "i", left: "j", down: "k", right:"l", element: "#playerOne"}),
            new Player({radius: 10, color: "hotpink", up: "w", right: "d", down: "s", left: "a", element: "#playerTwo"})     
        ];

        this.powerUps = [];

        for(let i = 0; i < 20; i++) {
          this.powerUps.push(new PowerUp({radius: 8, color: "purple", x: (Math.random() * this.width), y: (Math.random() * this.height)}))
        }
    }
}

Game.prototype.update = function() {
    this.players.forEach(player => {
            if(player.keyboard.key_order.size > 0 && player.keyboard.checkCurrentKey() == player.keyboard.DOWN_ARROW) {
                player.blob.ay = 0.02;
                player.blob.vx = 0;
                player.blob.ax = 0;
            } else if(player.keyboard.key_order.size > 0 && player.keyboard.checkCurrentKey() == player.keyboard.UP_ARROW) {
                player.blob.ay = -0.02;
                player.blob.vx = 0;
                player.blob.ax = 0;
            } else if(player.keyboard.key_order.size > 0 && player.keyboard.checkCurrentKey() == player.keyboard.LEFT_ARROW) {
                player.blob.ax = -0.02;
                player.blob.vy = 0;
                player.blob.ay = 0;
            } else if(player.keyboard.key_order.size > 0 && player.keyboard.checkCurrentKey() == player.keyboard.RIGHT_ARROW) {
                player.blob.ax = 0.02;
                player.blob.vy = 0;
                player.blob.ay = 0;
            }

            if(player.blob.left >= this.width) player.blob.setRightPosition(1);
            if(player.blob.right <= 0) player.blob.setLeftPosition(this.width - 1);
            if(player.blob.top >= this.height) player.blob.setBottomPosition(1);
            if(player.blob.bottom <= 0) player.blob.setTopPosition(this.height - 1);

            player.blob.updatePosition()
    })

}

Game.prototype.drawBackground = function() {
    for(let x = -this.width; x < this.width * 2; x+= 45) {
        this.ctx.moveTo(x, -this.height);
        this.ctx.lineTo(x, this.height*2);
    }
    
    for(let y = -this.height; y < this.height * 2; y+= 45) {
        this.ctx.moveTo(-this.width, y);
        this.ctx.lineTo(this.width * 2, y);
    }
    this.ctx.strokeStyle = "#555555";
    this.ctx.stroke();
}

Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackground();
    this.players.forEach(player => player.blob.draw(this.ctx))
    this.powerUps.forEach(powerup => powerup.draw(this.ctx))
}

Game.prototype.checkCollision = function() {
    const self = this;
    
    this.players.forEach( player => {
        this.powerUps.forEach(powerUp => {
            player.blob.checkCollision(powerUp, function() {
                player.blob.points++;
                player.blob.grow();
                powerUp.setCenterPosition(random(10, self.width ), random(10, self.height - 10));
                document.querySelector(player.blob.element).innerHTML = player.blob.points;
            })
        })
    })
}

Game.prototype.start = function() {

    this.update();

    this.checkCollision();

    this.draw();

    this.animationFrame = window.requestAnimationFrame(this.start.bind(this));

}

Game.prototype.stop = function() {
    window.cancelAnimationFrame(this.animationFrame);
}

Game.prototype.reset = function() {
    this.players.forEach(player => player.blob.reset())
    this.start();
}


class Player {
    constructor({x = 0, y = 0, radius = 0,color = "blue",up= "ArrowUp",left= "ArrowLeft",down= "ArrowDown",right= "ArrowRight",element}) {
        this.blob = new Blob({x, y, radius, color,element});
        this.keyboard = new Keyboard({left,right,down,up});
    }    
}


class Entity {
    constructor({x = 5, y = 10, radius = 10, color = "purple"}) {
        this.color = color;
        this.speed = .5;
        this.top_speed = 2;
        this.radius = radius;
        this.size = radius * 2;
        this.left = x - radius;
        this.right = x + radius;
        this.top = y - radius;
        this.bottom = y + radius;
        this.x = x;
        this.y = y;
        this.prev_x = 0;
        this.prev_y = 0;
        this.previousPositions = [,,,,,];
        this.dx = 0;
        this.dy = 0;
        this.prev_dx = 0;
        this.prev_dy = 0;
        this.vx = 0;
        this.vy = 0;
        this.prev_vx = 0;
        this.prev_vy = 0;
        this.ax = 0.0;
        this.ay = 0.0;
        this.prev_ax = 0;
        this.prev_ay = 0;
        this.fx = 0;
        this.fy = 0;
    }
}


Entity.prototype.setTopPosition = function(t) {
    this.top = t;
    this.bottom = t + this.size;    
    this.y = t + this.size / 2;
}

Entity.prototype.setRightPosition = function(r) {
    this.right = r;
    this.left = r - this.size;
    this.x = r - this.size / 2;
}

Entity.prototype.setBottomPosition = function(b) {
    this.bottom = b;
    this.top = b - this.size;
    this.y = b - this.size / 2;
}

Entity.prototype.setLeftPosition = function(l) {
    this.left = l;
    this.right = l + this.size;
    this.x = l + this.size / 2;
}

Entity.prototype.setCenterPosition = function( x, y ) {
    this.left = x - this.radius;
    this.right = x + this.radius;
    this.top = y - this.radius;
    this.bottom = y + this.radius;
    this.x = x;
    this.y = y;
}

Entity.prototype.updatePosition = function() {
    this.vx += this.ax;
    this.vy += this.ay;

    if(this.vx > this.top_speed) this.vx = this.top_speed;
    if(this.vy > this.top_speed) this.vy = this.top_speed;
    if(this.vx < -this.top_speed) this.vx = -this.top_speed;
    if(this.vy < -this.top_speed) this.vy = -this.top_speed;

    this.x += this.vx;
    this.y += this.vy;

    this.setCenterPosition(this.x, this.y);

    this.previousPositions.push({x: this.x, y: this.y});
    this.previousPositions.shift()
}

Entity.prototype.checkCollision = function(entity, callback,ctx) {

    let x = Math.abs(this.x - entity.x);
    let y = Math.abs(this.y - entity.y);

    if(Math.abs(Math.sqrt(x * x + y * y)) < this.radius + entity.radius) {
        callback();
    }
}

Entity.prototype.grow = function() {
  this.radius += 1;
}

Entity.prototype.draw = function(ctx) {
    this.updatePosition();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}

Entity.prototype.reset = function(x= 10, y = 10) {
    this.speed = .5;
    this.top_speed = 2;
    this.size = 10;
    this.left = x - this.size / 2;
    this.right = x + this.size / 2;
    this.top = y - this.size / 2;
    this.bottom = y + this.size / 2;
    this.x = x;
    this.y = y;
    this.prev_x = 0;
    this.prev_y = 0;
    this.previousPositions = [,,,,,];
    this.dx = 0;
    this.dy = 0;
    this.prev_dx = 0;
    this.prev_dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.prev_vx = 0;
    this.prev_vy = 0;
    this.ax = 0.0;
    this.ay = 0.0;
    this.prev_ax = 0;
    this.prev_ay = 0;
    this.fx = 0;
    this.fy = 0;
}


class Blob extends Entity {
    constructor({x = 5, y = 10, color = "red", element}) {
        super({x, y, color});

        this.blobBody = [];
        this.points = 1;
        this.element = element
    }
}

Blob.prototype.reset = function(x, y) {

}


class PowerUp extends Entity {
    constructor({x = 199, y = 10, radius, color = "purple"}) {
        super({x, y , radius, color})
    }
}


class Keyboard {
    constructor({up = "w", right = "d", down = "s", left = "a"}) {
        this.UP_ARROW = up;
        this.RIGHT_ARROW = right;
        this.DOWN_ARROW = down;
        this.LEFT_ARROW = left;
        this.key_order = new Set();
    }

    checkCurrentKey() {
        return [...this.key_order].pop();
    }
}


Keyboard.prototype.keyPressedHandler = function(e) {
    const key = e.key.toLowerCase()
    switch (key) {
        case this.UP_ARROW:
            this.key_order.add(key);
            break;
        case this.RIGHT_ARROW:
            this.key_order.add(key);
            break;
        case this.DOWN_ARROW:
            this.key_order.add(key);
            break;
        case this.LEFT_ARROW:
            this.key_order.add(key);
            break;
        default:
            break;
    }
}

Keyboard.prototype.keyUpHandler = function(e) {
    this.key_order.delete(e.key.toLowerCase())
}



const game = new Game({width: innerWidth / 1.2, height: innerHeight / 2});

game.start();



addEventListener("keypress", function(e) {
    game.players.forEach(player => player.keyboard.keyPressedHandler(e))
})

addEventListener("keyup", function(e) {
    game.players.forEach(player => player.keyboard.keyUpHandler(e))
})
