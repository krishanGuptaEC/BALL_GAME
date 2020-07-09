import { detectcollision } from "/src/collision";

export default class balls {
	constructor(game) {
		this.game = game;
		this.gamewidth = game.gameWidth;
		this.gameheight = game.gameHeight;

		this.width = 20;
		this.height = 20;
		this.image = document.getElementById("ball_image");
		this.reset();
	}
	reset() {
		this.speed = { x: 5, y: -5 };
		this.position = {
			x: 0,
			y: this.game.gameHeight - 100
		};
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
	update() {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
		if (this.position.x < 0 || this.position.x + this.width > this.gamewidth) {
			this.speed.x = -this.speed.x;
		}
		if (this.position.y < 0) {
			this.speed.y = -this.speed.y;
		}
		if (this.position.y + this.height > this.gameheight) {
			this.game.lives--;
			this.reset();
		}
		if (detectcollision(this, this.game.paddle)) {
			this.speed.y = -this.speed.y;
			this.position.y = this.game.paddle.position.y - this.height;
			if (this.position.y > this.game.paddle.position.y) {
				this.speed.y = 0;
				this.spped.x = 0;
			}
		}
	}
}
