var eyelidId = '#eyelid';
var eyeId ='#eye';
var irisId ='#iris';
var containerId = '#eye-container';
var balloonId = '#balloon';

function eyeLook(e){
	var x = e.pageX;
	var y = e.pageY;
	
	var dot = $(eyeId);
	var eye = $(irisId);
	
	var dotCenterX = dot.offset().left + dot.width()/2;
	var dotCenterY = dot.offset().top + dot.height()/2;
	
	var ydist = y-dotCenterY;
	var xdist = x-dotCenterX; 
	
	var angle = Math.atan2(ydist,xdist);
	var radius = 8;
	
	var dist = Math.sqrt( ydist*ydist + xdist*xdist );
	if(dist < radius){
		radius = dist;
	}
	
	var xpos = Math.cos(angle)*radius + dot.width()/2 - eye.width()/2;
	var ypos = Math.sin(angle)*radius + dot.height()/2 - eye.height()/2;
	
	eye.css({left:xpos, top:ypos});
	
}
function eyeBlink(e){
	var lid = $(eyelidId);
	var container = $(containerId);
	lid.animate({height:container.height()+"px"}, 150, 'swing', function(){lid.animate({height:"0px"}, 150, 'swing')});
}
function eyeGrow(){
	var eye = $(containerId);
	var width = eye.width()+5;
	var height= eye.height()+5;
}
function balloonGrow(){
	var balloon = $(balloonId);	
	balloon.animate({height:"50px", width:"50", right:"-12px",bottom:"-10px"}, 1500);
}
function balloonBounce(){
	
}

$(function(){
	var container =$(containerId);
	container.fadeIn(3000);
	container.click(eyeBlink);	
	$(document).mousemove(eyeLook);
});



