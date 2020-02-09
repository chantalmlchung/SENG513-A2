$(document).ready(() => {
	let result = 0;
	let prev_entry = 0;
	let cur_entry = 0;
	let clear_prev = true;
	$('.current').html(cur_entry);

	$('.clear').on('click', function(evt) {
		let button_pressed = $(this).html();
		$('.current').html('0');
		$('.previous').html('');
		clear_prev = true;
	});
	$('.back').on('click', function(evt) {
		let button_pressed = $(this).html();
		cur_entry = $('.current').html();
		$('.current').html(cur_entry.slice(0, -1));
	});
	$('.num_button').on('click', function(evt) {
		let button_pressed = $(this).html();
		cur_entry = $('.current').html();
		if (!clear_prev) {
			$('.current').html(cur_entry + button_pressed);
		}
		else {
			$('.current').html(button_pressed);
			clear_prev = false;
		}
	});
	$('.operator').on('click', function(evt) {
		let button_pressed = $(this).html();
		cur_entry = $('.current').html();
		if (button_pressed === 'x') {
			button_pressed = '*'
		}
		if (!clear_prev) {
			$('.current').html(cur_entry + button_pressed);
		}
		else {
			$('.current').html(button_pressed);
			clear_prev = false;
		}
	});
	$('.eval').on('click', function(evt) {
		cur_entry = $('.current').html();
		try {
			let result = eval(cur_entry)
			$('.current').html(result);
			$('.previous').html(cur_entry);
		}
		catch (e) {
			$('.current').html('Err');
			$('.previous').html(cur_entry);
		}
	});
})
