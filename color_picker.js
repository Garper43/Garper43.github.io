var picker_wrapper = document.getElementById('color_picker_wrapper');
var picker_button = document.getElementById('picker_button');
var picker = document.getElementById('color_picker');
var sliders = document.getElementById('sliders');
var preview = document.getElementById('color_picker_preview');
var slider = {
	r: document.getElementsByClassName('rgb_slider')[0],
	g: document.getElementsByClassName('rgb_slider')[1],
	b: document.getElementsByClassName('rgb_slider')[2],
}
var drag = false;
var rgb
var active

function rgbset() {
	var rgb = 'rgb(' + slider.r.value + ',' + slider.g.value + ',' + slider.b.value + ')';
	preview.style.backgroundColor = rgb;
}

sliders.addEventListener( 'mousemove', rgbset() )

setInterval( rgbset() , 100 );

function find( e , a ) { 
	return Number(eval('e.style.' + a).slice( 0 , eval('e.style.' + a).indexOf('px') ));
}

function set( e , x , y ) {
	e.style.left = x + 'px';
	e.style.top = y + 'px';
}

var Sx;
var Sy;

var pickerShow = false;

function show() {
	picker_wrapper.style.display = 'flex';
	pickerShow = true;
}

function hide() {
	picker_wrapper.style.display = 'none';
	pickerShow = false;
}

picker_button.addEventListener( 'click', function() { //apply
	hide()
	active.setAttribute('name', preview.style.backgroundColor);
	active.style.backgroundColor = preview.style.backgroundColor;
} )

document.addEventListener( 'click', function(ev) {
	if( ev.target.className == 'preview' ) { 
		show();
		active = ev.target;
	 }
} )

/*preview.addEventListener( 'mousedown' , function(ev) {
	drag = true;
	x = ev.clientX;
	y = ev.clientY;
	Sx = x - find( picker, 'left' );
	Sy = y - find( picker, 'top' );
} )
document.addEventListener( 'mouseup' , function() {
	drag = false;
} )
document.addEventListener( 'mousemove' , function(ev) {
	if( drag ) {
		x = ev.clientX;
		y = ev.clientY;
		set( picker , x - Sx , y - Sy )
	}
} )*/