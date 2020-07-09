import { detectcollision } from "/src/collision";

export default class bricks {
	constructor(game, position) {
		this.game = game;
		this.width = 80;
		this.height = 24;
		this.position = position;
		this.mark = false;
		this.image = document.getElementById("Brick");
	}
	update() {
		if (detectcollision(this.game.ball, this)) {
			this.game.ball.speed.y = -this.game.ball.speed.y;
			this.mark = true;
		}
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
}
