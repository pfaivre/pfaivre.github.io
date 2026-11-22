/**
 * Mastermind by pfaivre
 *
 * Enter your tries in the textarea, one per line:
 *   ABCD12
 *   EEFF01
 * Four letters (A-F) for the guess, then the number of correct pegs,
 * then the number of badly placed pegs. The page lists the remaining
 * possible solutions, best next guesses first (minimax ranking).
 */

var CODE_LENGTH = 4;
var LETTERS = 'ABCDEF';
// Slightly desaturated: A green, B orange, C blue, D yellow, E purple, F brown
var COLOR_HEX = ['#3FA64A', '#EE6A1C', '#3F7FE8', '#E0B000', '#9B45B0', '#B5612A'];
var SHOW_SOLUTIONS = 24;
var RANK_THRESHOLD = 512;

var ALL_CODES = null;

// Returns black * 10 + white (white is always < 10)
function score_fast(a, b) {
    var black = 0;
    var i;
    var count_a = [];
    var count_b = [];
    for (i = 0; i < LETTERS.length; i++) {
        count_a[i] = 0;
        count_b[i] = 0;
    }
    for (i = 0; i < CODE_LENGTH; i++) {
        if (a[i] === b[i]) {
            black++;
        } else {
            count_a[a[i]]++;
            count_b[b[i]]++;
        }
    }
    var white = 0;
    for (i = 0; i < LETTERS.length; i++) {
        white += Math.min(count_a[i], count_b[i]);
    }
    return black * 10 + white;
}

function build_all_codes() {
    if (ALL_CODES) {
        return ALL_CODES;
    }
    ALL_CODES = [];
    for (var a = 0; a < LETTERS.length; a++) {
        for (var b = 0; b < LETTERS.length; b++) {
            for (var c = 0; c < LETTERS.length; c++) {
                for (var d = 0; d < LETTERS.length; d++) {
                    ALL_CODES.push([a, b, c, d]);
                }
            }
        }
    }
    return ALL_CODES;
}

function code_to_string(code) {
    var s = '';
    for (var i = 0; i < CODE_LENGTH; i++) {
        s += LETTERS[code[i]];
    }
    return s;
}

// Each valid line looks like "ABCD12": 4 letters then two digits.
function parse_input(text) {
    var tries = [];
    var invalid = [];
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim().toUpperCase();
        if (!line) {
            continue;
        }
        var m = line.match(/^([A-F]{4})(\d)(\d)$/);
        if (!m) {
            invalid.push(lines[i].trim());
            continue;
        }
        var code = [];
        for (var k = 0; k < CODE_LENGTH; k++) {
            code.push(LETTERS.indexOf(m[1].charAt(k)));
        }
        tries.push({ code: code, key: Number(m[2]) * 10 + Number(m[3]) });
    }
    return { tries: tries, invalid: invalid };
}

// All codes consistent with every entered try
function compute_possible(tries) {
    build_all_codes();
    var possible = ALL_CODES.slice();
    for (var r = 0; r < tries.length; r++) {
        var t = tries[r];
        possible = possible.filter(function(c) { return score_fast(c, t.code) === t.key; });
    }
    return possible;
}

// Worst-case number of remaining candidates if this code is guessed next
function minimax_worst(guess, set) {
    var counts = [];
    var max = 0;
    for (var i = 0; i < set.length; i++) {
        var k = score_fast(set[i], guess);
        counts[k] = (counts[k] || 0) + 1;
        if (counts[k] > max) {
            max = counts[k];
        }
    }
    return max;
}

// Possible solutions sorted by preference: lowest worst-case first.
// Ranking is skipped while too many candidates remain (it gets expensive
// and barely matters before the first try is entered).
function rank_solutions(possible) {
    var ranked = possible.map(function(c) { return { code: c, worst: null }; });
    if (possible.length > 0 && possible.length <= RANK_THRESHOLD) {
        for (var i = 0; i < ranked.length; i++) {
            ranked[i].worst = minimax_worst(ranked[i].code, possible);
        }
        ranked.sort(function(a, b) {
            if (a.worst !== b.worst) {
                return a.worst - b.worst;
            }
            for (var k = 0; k < CODE_LENGTH; k++) {
                if (a.code[k] !== b.code[k]) {
                    return a.code[k] - b.code[k];
                }
            }
            return 0;
        });
    }
    return ranked;
}

/* ---------- On-screen keypad ---------- */

// Insert text at the cursor of the textarea (replacing any selection)
function insert_text(text) {
    var input = document.getElementById('input');
    var start = input.selectionStart;
    var end = input.selectionEnd;
    input.value = input.value.slice(0, start) + text + input.value.slice(end);
    input.selectionStart = input.selectionEnd = start + text.length;
    input.focus();
    render();
}

function keypad_backspace() {
    var input = document.getElementById('input');
    var start = input.selectionStart;
    var end = input.selectionEnd;
    if (start !== end) {
        input.value = input.value.slice(0, start) + input.value.slice(end);
    } else if (start > 0) {
        input.value = input.value.slice(0, start - 1) + input.value.slice(start);
        start--;
    }
    input.selectionStart = input.selectionEnd = start;
    input.focus();
    render();
}

// Dark text on light colors, white text on dark colors
function key_text_color(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 200 ? '#1a1a1a' : '#ffffff';
}

function build_keypad() {
    var color_keys = document.getElementById('color-keys');
    for (var i = 0; i < LETTERS.length; i++) {
        (function(index) {
            var button = document.createElement('button');
            button.className = 'color-key';
            button.type = 'button';
            button.textContent = LETTERS.charAt(index);
            button.title = 'Color ' + LETTERS.charAt(index);
            button.style.backgroundColor = COLOR_HEX[index];
            button.style.color = key_text_color(COLOR_HEX[index]);
            button.onclick = function() { insert_text(LETTERS.charAt(index)); };
            color_keys.appendChild(button);
        })(i);
    }
    var digit_keys = document.getElementById('digit-keys');
    for (var n = 0; n <= CODE_LENGTH; n++) {
        (function(digit) {
            var button = document.createElement('button');
            button.className = 'digit-key';
            button.type = 'button';
            button.textContent = String(digit);
            button.title = 'Peg count ' + digit;
            button.onclick = function() { insert_text(String(digit)); };
            digit_keys.appendChild(button);
        })(n);
    }
    var back = document.createElement('button');
    back.className = 'digit-key';
    back.type = 'button';
    back.textContent = '⌫';
    back.title = 'Delete last character';
    back.onclick = keypad_backspace;
    digit_keys.appendChild(back);
    var newline = document.createElement('button');
    newline.className = 'digit-key';
    newline.type = 'button';
    newline.textContent = '⏎';
    newline.title = 'New line (next try)';
    newline.onclick = function() { insert_text('\n'); };
    digit_keys.appendChild(newline);
}

function render() {
    var parsed = parse_input(document.getElementById('input').value);
    var status = document.getElementById('status');
    var label = document.getElementById('solutions-label');
    var list = document.getElementById('solutions');
    list.innerHTML = '';

    if (parsed.invalid.length > 0) {
        status.textContent = 'Ignored malformed line' + (parsed.invalid.length > 1 ? 's' : '') + ': ' +
            parsed.invalid.join(', ') + ' (expected e.g. ABCD12)';
    } else {
        status.textContent = '';
    }

    var possible = compute_possible(parsed.tries);
    var ranked = rank_solutions(possible);

    if (possible.length === 0) {
        label.textContent = 'No possible solution — check your tries.';
        return;
    }
    if (parsed.tries.length === 0) {
        label.textContent = possible.length + ' possible solutions. Enter a try above to get recommendations.';
    } else {
        label.textContent = possible.length + ' possible solution' + (possible.length > 1 ? 's' : '') +
            ' — best next guesses first' +
            (possible.length > SHOW_SOLUTIONS ? ' (showing ' + SHOW_SOLUTIONS + ')' : '') + ':';
    }

    var shown = ranked.slice(0, SHOW_SOLUTIONS);
    for (var s = 0; s < shown.length; s++) {
        var row = document.createElement('div');
        row.className = 'solution-row' + (parsed.tries.length > 0 && s === 0 ? ' best' : '');
        var tag = document.createElement('span');
        tag.className = 'solution-tag';
        tag.textContent = (parsed.tries.length > 0 && s === 0) ? 'best' : '';
        row.appendChild(tag);
        var code = document.createElement('span');
        code.className = 'solution-code';
        code.textContent = code_to_string(shown[s].code);
        row.appendChild(code);
        var badge = document.createElement('span');
        badge.className = 'worst-badge';
        badge.textContent = shown[s].worst === null ? '' : String(shown[s].worst);
        row.appendChild(badge);
        list.appendChild(row);
    }
}

if (typeof document !== 'undefined') {
    document.getElementById('input').addEventListener('input', render);
    build_keypad();
    render();
}
