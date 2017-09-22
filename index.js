const BALL_RADIUS = 20,
	WIRE_LENGTH = window.innerHeight/ 2,
	GRAVITY = 0.6;

const canvasWidth = window.innerWidth,
	canvasHeight = window.innerHeight;

const ball = { x: canvasWidth/2 - WIRE_LENGTH, y: canvasHeight/2 - WIRE_LENGTH/2 },
	pivot = { fx: canvasWidth/2, fy: canvasHeight/2 - WIRE_LENGTH/2 },
	wire = { source: 0, target: 1 };

let init = false;

d3.forceSimulation()
	.alphaDecay(0)
	.velocityDecay(0)
	.nodes([ball, pivot])
	.force('gravity', d3.forceConstant()
		.strength(GRAVITY)
		.direction(90)
	)
	.force('suspension', d3.forceLink([wire])
		.distance(WIRE_LENGTH)
	)
	.force('init', () => {
		if (!init) {
			ball.vx = 0;
			ball.vy = 0;
			init = true;
		}
	})
	.on('tick', () => { ballDigest(); wireDigest(); });

// Drag interaction
d3.select('#ball-el').call(d3.drag()
	.on("start", d => { d.fx = d.x; d.fy = d.y; })
	.on("drag", d => { d.fx = d3.event.x; d.fy = d3.event.y; })
	.on("end", d => { d.fx = null; d.fy = null; })
);

//

function ballDigest() {
	d3.select('#ball-el').datum(ball)
		.attr('cx', d => d.x)
		.attr('cy', d => d.y);
}

function wireDigest() {
	d3.select('#wire-el').datum(wire)
		.attr('x1', d => d.source.x)
		.attr('y1', d => d.source.y)
		.attr('x2', d => d.target.x)
		.attr('y2', d => d.target.y);
}
