import game from "/src/game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let games = new game(GAME_WIDTH, GAME_HEIGHT);
games.start();

function gameloop() {
	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	games.update();
	games.draw(ctx);

	requestAnimationFrame(gameloop);
}
requestAnimationFrame(gameloop);
