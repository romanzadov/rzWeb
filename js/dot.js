var triangles = [];
var goldenRatio = (1 + Math.sqrt(5)) / 2;
var c;

function drawTriangle(triangle) {
	c.globalAlpha = 0.01;
	if (triangle.color) {
		c.fillStyle = '#033';
	} else {
		c.fillStyle = '#303';
	}
	c.beginPath();
	c.moveTo(triangle.A.x, triangle.A.y);
	c.lineTo(triangle.B.x, triangle.B.y);
	c.lineTo(triangle.C.x, triangle.C.y);
	c.closePath();
	c.fill();
}
function fadeInTriangle(triangle) {
	for (var i = 0; i<100; i++) {
		window.setTimeout(drawTriangle(triangle), i*50);
	}
}

$(function(){
	c = document.getElementById('canvas').getContext('2d');
	var A = {x:300, y:300};
	var r = 300;
	var theta = 36 * (Math.PI/180);
	var outerPoints = {};
	for (var i=0; i<11; i++) {
		var x = r * Math.cos( i*theta ) + A.x;
		var y = r * Math.sin( i*theta ) + A.y;
		outerPoints[i] = {x:x, y:y};
	}
	for (var i=0; i<11; i++) {
		if (i%2 == 0) {
			var triangle = {A:A, B:outerPoints[i], C:outerPoints[(i+1)%10], color:0};
		} else {
			var triangle = {A:A, B:outerPoints[(i+1)%10], C:outerPoints[i], color:0};
		}
		triangles.push(triangle)
	}
	
	triangles = triangles.concat(subdivide());
	//triangles = triangles.concat(subdivide());

	for (var i=0; i<triangles.length; i++) {
		window.setTimeout(fadeInTriangle(triangles[i]), 500);
	}
});

function subdivide() {
    var result = [];
    for (var i=0; i<triangles.length; i++) { 
		var triangle = triangles[i];
		var color = triangle.color;
		var A = triangle.A;
		var B = triangle.B;
		var C = triangle.C;
        if (color == 0) {
            // Subdivide red triangle
            var x = A.x + (B.x - A.x) / goldenRatio;
            var y = A.y + (B.y - A.y) / goldenRatio;
            var P = {x:x, y:y};
            result.push({A:C, B:P, C:B, color:0});
            result.push({A:B, B:C, C:A, color:1});
        } else {
            // Subdivide blue triangle
            var Q = {x:B.x + (A.x - B.x) / goldenRatio, y:B.y + (A.y - B.y) / goldenRatio};
			var R = {x:B.x + (C.x - B.x) / goldenRatio, y:B.y + (C.y - B.y) / goldenRatio};
			result.push({A:R, B:C, C:A, color:1});
			result.push({A:Q, B:R, C:B, color:1});
			result.push({A:R, B:Q, C:A, color:0});
		}
	}
	return result;
}


