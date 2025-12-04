class Entity {
     constructor({ x = 5, y = 10, radius = 10, color = "purple" }) {
          this.color = color;
          this.speed = 0.5;
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
          this.previousPositions = [, , , , ,];
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

Entity.prototype.setTopPosition = function (t) {
     this.top = t;
     this.bottom = t + this.size;
     this.y = t + this.size / 2;
};

Entity.prototype.setRightPosition = function (r) {
     this.right = r;
     this.left = r - this.size;
     this.x = r - this.size / 2;
};

Entity.prototype.setBottomPosition = function (b) {
     this.bottom = b;
     this.top = b - this.size;
     this.y = b - this.size / 2;
};

Entity.prototype.setLeftPosition = function (l) {
     this.left = l;
     this.right = l + this.size;
     this.x = l + this.size / 2;
};

Entity.prototype.setCenterPosition = function (x, y) {
     this.left = x - this.radius;
     this.right = x + this.radius;
     this.top = y - this.radius;
     this.bottom = y + this.radius;
     this.x = x;
     this.y = y;
};

Entity.prototype.updatePosition = function () {
     this.vx += this.ax;
     this.vy += this.ay;

     if (this.vx > this.top_speed) this.vx = this.top_speed;
     if (this.vy > this.top_speed) this.vy = this.top_speed;
     if (this.vx < -this.top_speed) this.vx = -this.top_speed;
     if (this.vy < -this.top_speed) this.vy = -this.top_speed;

     this.x += this.vx;
     this.y += this.vy;

     this.setCenterPosition(this.x, this.y);

     this.previousPositions.push({ x: this.x, y: this.y });
     this.previousPositions.shift();
};

Entity.prototype.checkCollision = function (entity, callback, ctx) {
     let x = Math.abs(this.x - entity.x);
     let y = Math.abs(this.y - entity.y);

     if (Math.abs(Math.sqrt(x * x + y * y)) < this.radius + entity.radius) {
          callback();
     }
};

Entity.prototype.grow = function () {
     this.radius += 1;
};

Entity.prototype.draw = function (ctx) {
     this.updatePosition();

     ctx.beginPath();
     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
     ctx.fillStyle = this.color;
     ctx.fill();
     ctx.closePath();
};

Entity.prototype.reset = function (x = 10, y = 10) {
     this.speed = 0.5;
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
     this.previousPositions = [, , , , ,];
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
};

export default Entity;
