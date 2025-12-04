import Entity from "./entity.js";

class Blob extends Entity {
     constructor({ x = 5, y = 10, color = "red", element }) {
          super({ x, y, color });

          this.blobBody = [];
          this.points = 1;
          this.element = element;
     }
}

Blob.prototype.reset = function (x, y) {};

export default Blob;
