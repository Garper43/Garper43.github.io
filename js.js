var gal = document.getElementById("gallery");
var Oimg = document.getElementsByClassName("Oimg");
var img = document.getElementsByClassName("img");
var chosen = document.getElementById("hi");
var aX = 0;
var aY = 0;
var password = document.getElementById("password");
var input = document.getElementById("input");
var pass = 'перегляд фотографій 2020';

input.addEventListener( 'keydown', function(ev) {
	if( ev.which == 13 ) {
		if( input.value == pass ) {
			password.style.display = 'none';
		}
	}
} )

function over() {
		chosen = event.target.parentNode;
}

function out() {
	chosen.style.transform = ""
	chosen = 0;
	console.log("gg");
}

document.addEventListener("mousemove", function(ev) {
	//chosen.style.transform = "rotateX(10deg)" + "translate3d(-50px, 0px, 10px)";
})