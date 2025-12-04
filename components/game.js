import Player from "./player.js";
import PowerUp from "./powerup.js";
import Helper from "./helper.js";

class Game {
     constructor({ width = 0, height = 0 }) {
          this.canvas = document.getElementById("canvas");
          this.ctx = this.canvas.getContext("2d");
          this.width = width || window.innerWidth;
          this.height = height || window.innerHeight;
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.animationFrame = null;

          this.entities = [];

          this.players = [
               new Player({
                    x: 100,
                    y: 200,
                    radius: 10,
                    color: "black",
                    up: "i",
                    left: "j",
                    down: "k",
                    right: "l",
                    element: "#playerOne",
               }),
               new Player({
                    radius: 10,
                    color: "hotpink",
                    up: "w",
                    right: "d",
                    down: "s",
                    left: "a",
                    element: "#playerTwo",
               }),
          ];

          this.powerUps = [];

          for (let i = 0; i < 20; i++) {
               this.powerUps.push(
                    new PowerUp({
                         radius: 8,
                         color: "purple",
                         x: Math.random() * this.width,
                         y: Math.random() * this.height,
                    }),
               );
          }
     }
}

Game.prototype.drawBackground = function () {
     for (let x = -this.width; x < this.width * 2; x += 45) {
          this.ctx.moveTo(x, -this.height);
          this.ctx.lineTo(x, this.height * 2);
     }

     for (let y = -this.height; y < this.height * 2; y += 45) {
          this.ctx.moveTo(-this.width, y);
          this.ctx.lineTo(this.width * 2, y);
     }
     this.ctx.strokeStyle = "#555555";
     this.ctx.stroke();
};

Game.prototype.draw = function () {
     this.ctx.clearRect(0, 0, this.width, this.height);
     this.drawBackground();
     this.players.forEach((player) => player.blob.draw(this.ctx));
     this.powerUps.forEach((powerup) => powerup.draw(this.ctx));
};

Game.prototype.checkCollision = function () {
     const self = this;

     this.players.forEach((player) => {
          this.powerUps.forEach((powerUp) => {
               player.blob.checkCollision(powerUp, function () {
                    player.blob.points++;
                    player.blob.grow();
                    powerUp.setCenterPosition(Helper.random(10, self.width), Helper.random(10, self.height - 10));
                    document.querySelector(player.blob.element).innerHTML = player.blob.points;
               });
          });
     });
};

Game.prototype.start = function () {
     this.update();

     this.checkCollision();

     this.draw();

     this.animationFrame = window.requestAnimationFrame(this.start.bind(this));
};

Game.prototype.update = function () {
     this.players.forEach((player) => {
          if (player.keyboard.key_order.size > 0 && player.keyboard.checkCurrentKey() == player.keyboard.DOWN_ARROW) {
               player.blob.ay = 0.02;
               player.blob.vx = 0;
               player.blob.ax = 0;
          } else if (player.keyboard.key_order.size > 0 && player.keyboard.checkCurrentKey() == player.keyboard.UP_ARROW) {
               player.blob.ay = -0.02;
               player.blob.vx = 0;
               player.blob.ax = 0;
          } else if (player.keyboard.key_order.size > 0 && player.keyboard.checkCurrentKey() == player.keyboard.LEFT_ARROW) {
               player.blob.ax = -0.02;
               player.blob.vy = 0;
               player.blob.ay = 0;
          } else if (player.keyboard.key_order.size > 0 && player.keyboard.checkCurrentKey() == player.keyboard.RIGHT_ARROW) {
               player.blob.ax = 0.02;
               player.blob.vy = 0;
               player.blob.ay = 0;
          }

          if (player.blob.left >= this.width) player.blob.setRightPosition(1);
          if (player.blob.right <= 0) player.blob.setLeftPosition(this.width - 1);
          if (player.blob.top >= this.height) player.blob.setBottomPosition(1);
          if (player.blob.bottom <= 0) player.blob.setTopPosition(this.height - 1);

          player.blob.updatePosition();
     });
};

Game.prototype.stop = function () {
     window.cancelAnimationFrame(this.animationFrame);
};

Game.prototype.reset = function () {
     this.players.forEach((player) => player.blob.reset());
     this.start();
};

export default Game;
