class Player {
     constructor({ x = 0, y = 0, radius = 0, color = "blue", up = "ArrowUp", left = "ArrowLeft", down = "ArrowDown", right = "ArrowRight", element }) {
          this.blob = new Blob({ x, y, radius, color, element });
          this.keyboard = new Keyboard({ left, right, down, up });
     }
}
