import paddles from "/src/paddle.js";
import InputHandler from "/src/input.js";
import balls from "/src/ball.js";
import bricks from "/src/brick.js";
import { level1, buildLevel, level2 } from "/src/level.js";

export default class game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.lives = 3;
		this.brick = [];
		this.GAMESTATE = {
			PAUSED: 0,
			RUNNING: 1,
			MENU: 2,
			GAMEOVER: 3,
			COMPLETE: 4
		};
		this.level = [level1, level2];
		this.curlev = 0;
	}

	start() {
		this.gamestate = this.GAMESTATE.MENU;
		this.paddle = new paddles(this);
		new InputHandler(this.paddle, this);
		this.ball = new balls(this);
		this.brick = buildLevel(this, this.level[this.curlev]);

		this.gameObject = [this.paddle, this.ball];
	}

	update() {
		if (this.lives === 0) {
			this.gamestate = this.GAMESTATE.GAMEOVER;
		}
		if (
			this.gamestate === this.GAMESTATE.PAUSED ||
			this.gamestate === this.GAMESTATE.MENU ||
			this.gamestate === this.GAMESTATE.GAMEOVER ||
			this.gamestate === this.GAMESTATE.COMPLETE
		)
			return;

		[...this.gameObject, ...this.brick].forEach(object => object.update());
		this.brick = this.brick.filter(object => !object.mark);

		if (this.brick.length === 0) {
			if (this.level.length === this.curlev + 1) {
				this.gamestate = this.GAMESTATE.COMPLETE;
			}
			if (this.gamestate === this.GAMESTATE.RUNNING) {
				this.curlev++;
				this.start();
			}
		}
	}

	draw(ctx) {
		if (this.gamestate === this.GAMESTATE.PAUSED) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fill();
			ctx.font = "30px Ariel";
			ctx.fillStyle = "White";
			ctx.textAlign = "center";
			ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
		}
		if (this.gamestate === this.GAMESTATE.MENU) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();
			ctx.font = "30px Ariel";
			ctx.fillStyle = "White";
			ctx.textAlign = "center";
			ctx.fillText("PRESS SPACE BAR", this.gameWidth / 2, this.gameHeight / 2);
		}
		if (this.gamestate === this.GAMESTATE.GAMEOVER) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();
			ctx.font = "30px Ariel";
			ctx.fillStyle = "White";
			ctx.textAlign = "center";
			ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
		}
		if (this.gamestate === this.GAMESTATE.COMPLETE) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = "balck";
			ctx.fill();
			ctx.font = "30px Ariel";
			ctx.fillStyle = "White";
			ctx.textAlign = "center";
			ctx.fillText("WINNER", this.gameWidth / 2, this.gameHeight / 2);
		}
		if (this.gamestate === this.GAMESTATE.RUNNING) {
			var lev = this.curlev + 1;
			var gradient = ctx.createLinearGradient(0, 0, this.gameWidth - 50, 30);
			gradient.addColorStop("0", "magenta");
			gradient.addColorStop("0.5", "blue");
			gradient.addColorStop("1.0", "red");
			ctx.font = "30px Ariel";
			ctx.fillStyle = gradient;
			ctx.textAlign = "right";
			ctx.fillText("LIVES: " + this.lives, this.gameWidth, 30);
			ctx.textAlign = "left";
			ctx.fillText("LEVEL: " + lev, 0, 30);
		}
		[...this.gameObject, ...this.brick].forEach(object => object.draw(ctx));
	}

	togglePause() {
		if (this.gamestate === this.GAMESTATE.PAUSED) {
			this.gamestate = this.GAMESTATE.RUNNING;
		} else {
			this.gamestate = this.GAMESTATE.PAUSED;
		}
	}
}
