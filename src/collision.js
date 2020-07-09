export function detectcollision(ball, gameObject) {
	let bottomofBall = ball.position.y + ball.height;
	let topofBall = ball.position.y;

	let topofObject = gameObject.position.y;
	let leftsideofObject = gameObject.position.x;
	let rightsideofObject = gameObject.position.x + gameObject.width;
	let bottomofObject = gameObject.position.y + gameObject.height;

	if (
		bottomofBall >= topofObject &&
		topofBall <= bottomofObject &&
		ball.position.x + ball.width >= leftsideofObject &&
		ball.position.x + ball.width <= rightsideofObject
	) {
		return true;
	} else {
		return false;
	}
}
