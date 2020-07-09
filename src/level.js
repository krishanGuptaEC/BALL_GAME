import bricks from "/src/brick.js";

export function buildLevel(game, level) {
	let brick = [];

	level.forEach((row, rowIndex) => {
		row.forEach((Brick, brickIndex) => {
			if (Brick === 1) {
				let position = {
					x: 80 * brickIndex,
					y: 40 + 24 * rowIndex
				};
				brick.push(new bricks(game, position));
			}
		});
	});
	return brick;
}

export const level1 = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export const level2 = [
	[0, 0, 0, 0, 1, 1, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 0, 0],
	[0, 0, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 1, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 0, 0]
];
