$(document).ready(() => {
	let cur_entry = 0;
	let clear_prev = true;
	let eval_prev = false;
	let op_prev = false;
	let num_open_bracket = 0;
	let num_closed_bracket = 0;
	let op_count = 0;
	$('.current').html(cur_entry);

	// Handle conditions when "C" button clicked
	$('.clear').on('click', function(evt) {
		let button_pressed = $(this).html();
		cur_entry = $('.current').html();
		eval_prev = false;
		op_prev = false;
		$('.current').html('0');
		$('.previous').html('Ans = ' + cur_entry);
		clear_prev = true;
		op_count = 0;
	});
	// Handle conditions when "CE" button clicked
	$('.back').on('click', function(evt) {
		let button_pressed = $(this).html();
		cur_entry = $('.current').html();
		$('.current').html(cur_entry.slice(0, -1));
		if (cur_entry === '0') {
			$('.current').html('0')
		}
		else if (['-', '/', '*', '+'].includes(cur_entry[cur_entry.length - 1])) {
				op_count -= 1;
		}

		cur_entry = $('.current').html();
		if (cur_entry === "Err" || cur_entry.length === 0 || eval_prev) {
			$('.current').html('0')
			clear_prev = true
		}
		eval_prev = false;
		op_prev = false;
	});
	// Handle conditions when numerical buttons clicked
	$('.num_button').on('click', function(evt) {
		let button_pressed = $(this).html();
		cur_entry = $('.current').html();
		if (cur_entry.length >= 30) {
			return;
		}
		if (!clear_prev && cur_entry !== 'Err' && !eval_prev) {
			$('.current').html(cur_entry + button_pressed);
		}
		else {
			prev_entry = $('.previous').html()
			$('.previous').html(prev_entry + cur_entry)
			$('.current').html(button_pressed);	
		}
		eval_prev = false;
		op_prev = false;
		clear_prev = false;
		op_count = 0;
	});
	// Handle conditions when operator buttons clicked
	$('.operator').on('click', function(evt) {
		let button_pressed = $(this).html();
		cur_entry = $('.current').html();
		if (['-', '/', '+', '*'].includes(cur_entry[cur_entry.length - 1])) {
			op_prev = true;
		}
		eval_prev = false;
		
		// If 30 characters on screen, don't allow any more
		if (cur_entry.length >= 30) {
			return;
		}

		// Replace 'x' with '*' for compatibility with eval() method
		if (button_pressed === 'x') {
			button_pressed = '*';
		}

		// Prevent users from adding closing parenthesis if no open parenthesis exists
		if (num_closed_bracket >= num_open_bracket && button_pressed === ')') {
			return;
		}

		// Handle open parenthesis conditions
		if (button_pressed === '(') {
			num_open_bracket += 1;
			if (clear_prev) {
				$('.current').html(button_pressed);
			}
			else {
				$('.current').html(cur_entry + button_pressed);
			}
			clear_prev = false;
			return;
		}

		// Handle close parenthesis conditions
		if (button_pressed === ')') {
			if (cur_entry[cur_entry.length - 1] !== '(') {
				$('.current').html(cur_entry + button_pressed);
				num_closed_bracket += 1;
			}
			clear_prev = false;
			return;
		}

		// Prevent users from continuously appending operators to the screen
		if (op_prev && cur_entry[cur_entry.length - 1] === button_pressed) {
			clear_prev = false;
			return;
		}

		if (op_count >= 2) {
			return;
		}
		else if (op_prev && cur_entry[cur_entry - 1] !== button_pressed && button_pressed !== '-') {
			$('.current').html(cur_entry.substring(0, cur_entry.length - 1) + button_pressed)
			op_count -= 1;
		}
		else {
			$('.current').html(cur_entry + button_pressed);
		}
		op_prev = true;
		clear_prev = false;
		op_count += 1;
	});
	// Handle conditions when eval button clicked
	$('.eval').on('click', function(evt) {
		cur_entry = $('.current').html();
		try {
			let result = eval(cur_entry)
			$('.current').html(result);
			if (eval_prev) {
				let prev = $('.previous').html();
				$('previous').html(prev);
			}
			else {
				$('.previous').html(cur_entry + ' = ');
			}
		}
		catch (e) {
			$('.current').html('Err');
			$('.previous').html(cur_entry);
		}
		eval_prev = true;
		op_count = 0;
		clear_prev = false;
		op_prev = false;
	});
})
