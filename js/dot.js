var triangleGroups = [];
var orderedTriangles = [];
var goldenRatio = (1 + Math.sqrt(5)) / 2;
var c;

function drawTriangle(triangle) {
	c.globalAlpha = 0.1;
	c.fillStyle = getTriangleColor(triangle);
	
	c.beginPath();
	c.moveTo(triangle.A.x, triangle.A.y);
	c.lineTo(triangle.B.x, triangle.B.y);
	c.lineTo(triangle.C.x, triangle.C.y);
	c.closePath();
	c.fill();
}
function fadeInTriangle(triangle) {
	for (var i = 0; i<10; i++) {
		window.setTimeout(function() {drawTriangle(triangle);}, i*50);
	}
}

$(function(){
	c = document.getElementById('canvas').getContext('2d');
	var A = {x:200, y:200};
	var r = 250;
	var theta = 36 * (Math.PI/180);
	var outerPoints = {};
	for (var i=0; i<11; i++) {
		var x = r * Math.cos( i*theta ) + A.x;
		var y = r * Math.sin( i*theta ) + A.y;
		outerPoints[i] = {x:x, y:y};
	}
	var triangles = [];
	for (var i=0; i<10; i++) {
		if (i%2 == 0) {
			var triangle = {A:A, B:outerPoints[i], C:outerPoints[(i+1)%10], color:0};
		} else {
			var triangle = {A:A, B:outerPoints[(i+1)%10], C:outerPoints[i], color:0};
		}
		triangles.push(triangle)
	}
	triangleGroups[0] = triangles;
	for (var i = 1; i<6; i++) {
		triangleGroups[i] = subdivide(triangleGroups[i-1]);
	}
	
	drawNextTriangle();
});

var indexOfSet = 0;
var indexInSet = 0;
function drawNextTriangle() {
	var relativeIndex = getRelativeIndex();
	var triangle = triangleGroups[relativeIndex][indexInSet];
	console.log(relativeIndex + " | " + indexInSet + " | " + triangle);
	fadeInTriangle(triangle);
	if (indexInSet < triangleGroups[relativeIndex].length - 1) {
		indexInSet++;
	} else {
		indexInSet = 0;
		indexOfSet++;
	}
	window.setTimeout(drawNextTriangle, 50);
}

function getTriangleColor(triangle) {
	var evenIteration = Math.floor(indexOfSet / triangleGroups.length) %2 == 0;
	if (triangle.color && evenIteration) {
		return 'white';
	} else if (!triangle.color && !evenIteration) {
		return 'white';
	}
	return 'black';
}

function getRelativeIndex() {
	if (indexOfSet % triangleGroups.length > triangleGroups.length/2) {
		return triangleGroups.length - indexOfSet % triangleGroups.length;
	} else  {
		return indexOfSet % triangleGroups.length;
	}
}

function subdivide(triangles) {
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
			result.push({A:P, B:C, C:A, color:1});
            result.push({A:C, B:P, C:B, color:0});
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


