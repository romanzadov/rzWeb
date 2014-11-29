var trianglePoints;

function drawTriangle() {
	var c = document.getElementById('canvas').getContext('2d');
	c.globalAlpha = 0.01;
	c.fillStyle = '#333';
	c.beginPath();
	c.moveTo(trianglePoints.a.x, trianglePoints.a.y);
	c.lineTo(trianglePoints.b.x, trianglePoints.b.y);
	c.lineTo(trianglePoints.c.x, trianglePoints.c.y);
	c.closePath();
	c.fill();
}
function fadeInTriangle(points) {
	trianglePoints = points;
	for (var i = 0; i<20; i++) {
		window.setTimeout(drawTriangle, i*50);
	}
}

$(function(){
	
	var a = {x:0, y:0};
	var b = {x:0, y:90};
	var c = {x:90, y:0};
	
	fadeInTriangle({a:a, b:b, c:c});
});



