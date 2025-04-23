/**
 * ShiftWork clocks by pfaivre
 *
 * Small library for displaying multiple analog clocks in a page with shift work highlight.
 *
 * Example of usage:
 *
 *     <link rel="stylesheet" href="shiftwork_clock.css">
 *
 *     <div id="Toronto" class="shiftwork_clock"
 *          data-timezone="America/Toronto"
 *          data-day-start="9" data-day-end="17">
 *     <div id="Paris" class="shiftwork_clock"
 *          data-timezone="Europe/Paris"
 *          data-day-start="9" data-day-end="17">
 *
 *     <script src="shiftwork_clock.js"></script>
 */

var clocks = document.querySelectorAll('.shiftwork_clock');

clocks.forEach(function(e) {
    initialize_shiftwork_clock(e.id, e.dataset.timezone);
});


function initialize_shiftwork_clock(id, time_zone) {
    clockEl = document.getElementById(id);

    // Populate the elements inside of the clock div
    dot = document.createElement("div");
    dot.classList.add("dot");
    dot2 = document.createElement("div");
    dot2.classList.add("dot2");
    dot3 = document.createElement("div");
    dot3.classList.add("dot3");
    info_time = document.createElement("div");
    info_time.classList.add("info", "time");
    hour_hand = document.createElement("div");
    hour_hand.classList.add("hour-hand");
    hour_hand_handle = document.createElement("div");
    hour_hand_handle.classList.add("hour-hand-handle");
    h_3 = document.createElement("span");
    h_3.classList.add("h_3");
    h_3.append("3");
    h_6 = document.createElement("span");
    h_6.classList.add("h_6");
    h_6.append("6");
    h_9 = document.createElement("span");
    h_9.classList.add("h_9");
    h_9.append("9");
    h_12 = document.createElement("span");
    h_12.classList.add("h_12");
    h_12.append("12");
    h_15 = document.createElement("span");
    h_15.classList.add("h_15");
    h_15.append("15");
    h_18 = document.createElement("span");
    h_18.classList.add("h_18");
    h_18.append("18");
    h_21 = document.createElement("span");
    h_21.classList.add("h_21");
    h_21.append("21");
    h_0 = document.createElement("span");
    h_0.classList.add("h_0");
    h_0.append("0");
    dialLines = document.createElement("div");
    dialLines.classList.add("diallines");

    clockEl.append(dot, dot2, dot3, dialLines, info_time, 
        hour_hand, hour_hand_handle, h_3, h_6, h_9, h_12, h_15, h_18, h_21, h_0);

    // Position each of the dial lines around the clock
    for (var i = 1; i <= 24; i++) {
        line = document.createElement("div");
        line.classList.add("dialline");
        line.style.transform = `rotate(${15*i}deg)`;
        dialLines.appendChild(line);
    }

    // First immediate update, i.e. when page loads
    update_shiftwork_clock(id, time_zone);

    // Programmed update every x milliseconds
    setInterval(function () {
        update_shiftwork_clock(id, time_zone);
    }, 10000);
}


function update_shiftwork_clock(id, time_zone) {
    var clockEl = document.getElementById(id);

    if (time_zone) {
        var sys_date = new Date().toLocaleString("en-US", { timeZone: time_zone });
        var d = new Date(sys_date);
    } else {
        d = new Date();
    }

    // d = new Date(2025, 9, 10, 0, 0, 0);  // For hand position debugging

    var h = d.getHours(),  // Hours 0-23
        m = d.getMinutes(),  // Minutes 0-59
        date = d.getDate(),  // Day number in the month 1-31
        month = d.getMonth() + 1,  // Month number 1-12
        year = d.getFullYear(),

        hDeg = h * 30 + m * (360 / 720), // Hours handle degrees in a 12h clock

        hEl = clockEl.querySelector('.hour-hand'),
        hhEl = clockEl.querySelector('.hour-hand-handle'),
        timeupEl = clockEl.querySelector('.time');

    // Rotate the hand
    hEl.style.transform = `rotate(${hDeg/2}deg)`;
    hhEl.style.transform = `rotate(${hDeg/2}deg)`;

    // Set the digital clock value
    timeupEl.innerHTML = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    
    // Move the digital clock depending on the hand position
    if (h > 6 && h < 18) {
        timeupEl.style.top = "32%";
    }
    else {
        timeupEl.style.top = "60%";
    }

    // Position the day time on the clock
    day_start_degrees = clockEl.dataset.dayStart * 15;
    day_end_degrees = clockEl.dataset.dayEnd * 15;

    if (typeof day_start_degrees !== 'undefined' && typeof day_end_degrees !== 'undefined') {
        // When the day time does not cross midnight
        if (day_start_degrees < day_end_degrees) {
            clockEl.style.background = `
                conic-gradient(
                    rgb(var(--clock-night-color)) 0,
                    rgb(var(--clock-night-color)) ${day_start_degrees}deg,
                    rgb(var(--clock-day-color)) ${day_start_degrees}deg,
                    rgb(var(--clock-day-color)) ${day_end_degrees}deg,
                    rgb(var(--clock-night-color)) ${day_end_degrees}deg,
                    rgb(var(--clock-night-color)) 360deg
                )
                no-repeat`;
        }
        // When the day time crosses midnight
        else {
            clockEl.style.background = `
                conic-gradient(
                    rgb(var(--clock-day-color)) 0,
                    rgb(var(--clock-day-color)) ${day_end_degrees}deg,
                    rgb(var(--clock-night-color)) ${day_end_degrees}deg,
                    rgb(var(--clock-night-color)) ${day_start_degrees}deg,
                    rgb(var(--clock-day-color)) ${day_start_degrees}deg,
                    rgb(var(--clock-day-color)) 360deg
                )
                no-repeat`;
        }
    }
    else {
        // Fallback for when the data is not set in the HTML
        clockEl.style.backgroundColor = "rgb(var(--clock-day-color))";
    }
}
