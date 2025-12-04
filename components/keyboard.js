class Keyboard {
     constructor({ up = "w", right = "d", down = "s", left = "a" }) {
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

Keyboard.prototype.keyPressedHandler = function (e) {
     const key = e.key.toLowerCase();
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
};

Keyboard.prototype.keyUpHandler = function (e) {
     this.key_order.delete(e.key.toLowerCase());
};

addEventListener("keypress", function (e) {
     game.players.forEach((player) => player.keyboard.keyPressedHandler(e));
});

addEventListener("keyup", function (e) {
     game.players.forEach((player) => player.keyboard.keyUpHandler(e));
});
