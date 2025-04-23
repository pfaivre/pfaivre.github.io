/**
 * Digital clocks by pfaivre
 *
 * Small library for displaying multiple digital clocks in a page.
 *
 * Example of usage:
 *
 *     <link rel="stylesheet" href="digital_clock.css">
 *
 *     <div id="Toronto" class="digital_clock" data-timezone="America/Toronto">
 *     <div id="Paris" class="digital_clock" data-timezone="Europe/Paris">
 *
 *     <script src="digital_clock.js"></script>
 */

var clocks = document.querySelectorAll('.digital_clock');

clocks.forEach(function(e) {
    initialize_digital_clock(e.id, e.dataset.timezone, e.dataset.label);
});


function initialize_digital_clock(id, time_zone, label) {
    clockEl = document.getElementById(id);

    // Populate the elements inside of the clock div
    info_label = document.createElement("div");
    info_label.classList.add("info", "label");
    info_label.innerHTML = label;
    info_time = document.createElement("div");
    info_time.classList.add("info", "time");

    clockEl.append(info_label, info_time);

    // First immediate update, i.e. when page loads
    update_digital_clock(id, time_zone);

    // Programmed update every x milliseconds
    setInterval(function () {
        update_digital_clock(id, time_zone);
    }, 10000);
}


function update_digital_clock(id, time_zone) {
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

        timeEl = clockEl.querySelector('.time');

    // Set the digital clock value
    timeEl.innerHTML = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
