import Player from "./player.js";

class Mouse {
     constructor() {
          this.x = 0;
          this.y = 0;

          this.offsetX = window.innerWidth / 2;
          this.offsetY = window.innerHeight / 2;
     }
}

Mouse.prototype.mouseMoveHandler = function (event) {
     this.x = event.clientX - this.offsetX;
     this.y = event.clientY - this.offsetY;

     console.log("mouse x:", this.x, "mouse y:", this.y);
};

addEventListener("mousemove", function (event) {
     Player.mouse.mouseMoveHandler(event);
});

export default Mouse;
