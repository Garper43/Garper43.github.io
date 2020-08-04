var tile = document.getElementsByClassName('tile');
var tile_wrapper = document.getElementById('tile_wrapper');
var number_of_tile_types;
var tiles = {
	persentage: [],
	name: [],
	pattern: [],
	pattern_name: [],
	color: [],
	mix: [],
	pattern_color: [],
};
var gcdl = [];
var menu = {
	menu: document.getElementById( 'input_box_wrapper' ),
	show: true,
	drag: false,
	button: document.getElementById( 'menu_button' ),
	slider: document.getElementById( 'input_slider' ),
}
var current_tile = -1;

function tile_number_change() {
	var number_input = Number(document.getElementById('number_input').value);
	number_of_tile_types = number_input;
	var tile_input = document.getElementById('tile_input');
	tile_input.innerHTML = '';
	tile_wrapper.innerHTML = '';
	for( i = 0 ; i < number_of_tile_types ; i++) {
		tile_input.innerHTML += '<div class="input" ><span class="preview" ></span><input placeholder="name" class="tile_name" ><input class="tile_input"  placeholder="percentage" ></div>';
		tile_wrapper.innerHTML += '<div class="tile" ><p></p></div>';
	}
}

function tile_mix() {
	current_tile = -1;
	gcd = [];
	tiles.pattern = [];
	tiles.pattern_name = [];
	tiles.mix = [];
	tiles.pattern_color = [];
	var total_persentage = 0;
	for( i = 0 ; i < tiles.persentage.length ; i++ ) {
		total_persentage += tiles.persentage[i];
	}
	for( x = 0 ; x <= tiles.persentage.length ; x++ ) {
		for( i = 0 ; i <= 100 ; i++ ) {
			if( tiles.persentage[x] % i == 0 ) { 
					gcdl.push(i);
			}
			
		}
	}
	for( x = 0 ; x < tiles.persentage.length ; x++ ) {
		for( i = 0 ; i < gcdl.length ; true ) {
			if( tiles.persentage[x] % gcdl[i] != 0 ) { gcdl.splice( i , 1 ) }
			else {i++}
		}
	}
	for( i = 0 ; gcdl.length > 1 ; true ) {
		if( gcdl[i] >= gcdl[i+1] ) { gcdl.splice( i+1, 1 ) }
		else { gcdl.splice( i, 1 ) }
	}
	tiles.pattern = [];
	for( i = 0 ; i < tiles.persentage.length ; i++ ) {
		tiles.pattern.push(tiles.persentage[i]/gcdl[0]);
	}
	total_persentage = 0;
	for( i = 0 ; i < tiles.pattern.length ; i++ ) {
		total_persentage += tiles.pattern[i];
	}
		tile_wrapper.innerHTML = '';
	for( i = 0 ; i < total_persentage ; i++) {
		tile_wrapper.innerHTML += '<div class="tile" ><p></p></div>';
	}
	for( x = 0 ; x < tiles.pattern.length ; x++ ) {
		for( y = 0 ; y < tiles.pattern[x] ; y++ ) {
			tiles.pattern_name.push( tiles.name[x] );
			tiles.pattern_color.push( tiles.color[x] );
		}
	}
	for( i = 0 ; i < tiles.pattern_name.length ; i++ ) {
		tiles.mix.push( i );
	}
	shuffle( tiles.mix )

	for( i = 0 ; i < tiles.pattern_name.length ; i++ ) {
		tile[i].childNodes[0].textContent = tiles.pattern_name[tiles.mix[i]];
		tile[i].style.backgroundColor = tiles.pattern_color[tiles.mix[i]];
	}
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function data_collection() {
	var input = document.getElementsByClassName('input');
	tiles = {
		persentage: [],
		name: [],
		pattern: [],
		pattern_name: [],
		color: [],
		mix: [],
		pattern_color: [],
	}
	for( i = 0 ; i < input.length ; i++ ) {
		if( input[i].childNodes[2].value != '' ) { 
			tiles.persentage.push(Number(input[i].childNodes[2].value));
			tiles.name.push(input[i].childNodes[1].value);
			tiles.color.push(input[i].childNodes[0].style.backgroundColor);
		}
	}
}

// randomizer controlls

function randomize() {
	if( current_tile + 1 >= tile.length ) { 
		tile[current_tile].style.boxShadow = 'none';
		current_tile = -1;
	}
	if( current_tile > -1 ) { tile[current_tile].style.boxShadow = 'none' }
	current_tile++;	
	tile[current_tile].style.boxShadow = 'inset 0px 0px 20vw 5px white';		
}

//pc randomizer controlls

document.addEventListener( 'keydown', function(ev) {
	if( ev.key == 'Enter' && ev.target.getAttribute('id') == 'number_input' ) { tile_number_change() }
	else if( ev.key == 'Enter' ) {
		randomize();
	}
} )

//mobile randomizer controlls

document.addEventListener( 'touchend', function(ev) {
	if( ev.target.getAttribute('id') != 'number_input' && ev.target.parentNode.className != 'input') {
		randomize();
	}
})

//menu controlls

function hide_menu() {
	if( menu.show ) {
		menu.menu.style.transition = '.2s';
		menu.menu.style.height = '40px';
		data_collection()
		tile_mix()
		menu.show = false;
		tile_wrapper.focus();
		menu.button.textContent = 'RANDOMIZE';
		menu.button.style.transform = 'rotate(-90deg)';
		menu.button.style.bottom = (window.innerHeight)/2 + 'px';
		menu.button.style.right = '-250px';
		menu.button.style.width = '50vh'
		menu.button.style.width = '50vh'
		setTimeout( function() {menu.menu.childNodes[1].style.opacity = 0;} , 200 );
	} else {
		tile_mix()
	}
}

function show_menu() {
	if( menu.show == false ) {
		menu.show = true;
		menu.menu.style.height = '100vh';
		menu.button.textContent = 'GO';
		menu.button.style.transform = 'rotate(0deg)';
		menu.button.style.bottom = '3vh';
		menu.button.style.right = (window.innerWidth - menu.button.offsetWidth)/2 + 'px';
		menu.slider.style.opacity = 0;
		menu.menu.childNodes[1].style.opacity = 1;
	}
	
}

//mobile menu controlls

menu.button.addEventListener( 'touchend', function(ev) {
	hide_menu()
} )

menu.slider.addEventListener( 'touchend' , function(ev) {
	show_menu()
} )

//pc menu controlls

menu.button.addEventListener( 'click', function(ev) {
	hide_menu()
} )

menu.slider.addEventListener( 'click' , function(ev) {
	show_menu()
} )
