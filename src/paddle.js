export default class paddles {
	constructor(game) {
		this.gameWidth = game.gameWidth;
		this.width = 150;
		this.height = 20;

		this.maxspeed = 10;
		this.speed = 0;
		this.freez = true;
		this.position = {
			x: game.gameWidth / 2 - this.width / 2,
			y: game.gameHeight - this.height - 10
		};
	}
	moveLeft() {
		this.speed = -this.maxspeed;
	}
	moveRight() {
		this.speed = this.maxspeed;
	}
	stop() {
		this.speed = 0;
	}
	draw(ctx) {
		ctx.fillStyle = "Black";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	update() {
		this.position.x += this.speed;
		if (this.position.x < 0) this.position.x = 0;
		if (this.position.x + this.width > this.gameWidth)
			this.position.x = this.gameWidth - this.width;
	}
}
