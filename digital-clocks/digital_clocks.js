/**
 * Digital clocks by pfaivre
 */

// Credit: @valdeci https://stackoverflow.com/questions/14733374/how-to-generate-an-md5-hash-from-a-string-in-javascript-node-js
var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

var clocks = {};

initialize_page();


function initialize_page() {
    // Fetch clocks from storage
    if (localStorage.getItem("clocks") === null) {
        console.log("saving to storage");
        clocks = [
            { "id": `${MD5('Toronto')}`, "label": "Toronto", "timezone": "America/Toronto" },
            { "id": `${MD5('New-York')}`, "label": "New-York", "timezone": "America/New_York" },
            { "id": `${MD5('London')}`, "label": "London", "timezone": "Europe/London" },
            { "id": `${MD5('Paris')}`, "label": "Paris", "timezone": "Europe/Paris", "tags": ["highlight"] },
            { "id": `${MD5('Nicosia')}`, "label": "Nicosia", "timezone": "Europe/Nicosia" },
            { "id": `${MD5('Singapore')}`, "label": "Singapore", "timezone": "Asia/Singapore" },
            { "id": `${MD5('Manila')}`, "label": "Manila", "timezone": "Asia/Manila" }
        ];
        localStorage.setItem("clocks", JSON.stringify(clocks));
    }
    clocks = JSON.parse(localStorage.getItem("clocks"));

    // Add clocks to the page and activate them
    var main_content_el = document.getElementById('main-content');
    var add_button_el = document.getElementById("add_clock_button");
    clocks.forEach(function (c) {
        var section_el = document.createElement("div");
        section_el.classList.add("section");
        if (c.hasOwnProperty("tags") && c.tags.includes("highlight")) {
            section_el.classList.add("highlight");
        }
        var close_button_el = document.createElement("button");
        close_button_el.classList.add("close_button");
        close_button_el.onclick = function () { remove_clock(c.id); };
        close_button_el.title = "Remove this clock";
        close_button_el.innerHTML = "🗙"
        var clock_el = document.createElement("div");
        clock_el.classList.add("digital_clock");
        clock_el.id = c.id;
        clock_el.dataset.label = c.label;
        clock_el.dataset.timezone = c.timezone;
        section_el.append(clock_el, close_button_el);
        main_content_el.insertBefore(section_el, add_button_el);

        initialize_digital_clock(clock_el.id, clock_el.dataset.timezone, clock_el.dataset.label);
    });
}


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

    if (clockEl == null) {
        // This is a bug ;)
        // It happens when a clock has been removed; its interval timer continues to run.
        // Have I been lazy and left it there? Maybe.
        // Let's ignore the problem.
        return;
    }

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


function prompt_new_clock() {
    label = window.prompt("Name", "Paris");
    if (label == null || label == "") {
        return;
    }
    label = label.substring(0, 32);

    time_zone = window.prompt("Time zone", "Europe/Paris");
    if (time_zone == null || time_zone == "") {
        return;
    }
    time_zone = time_zone.substring(0, 32);

    var id_string = label;
    id_hash = MD5(id_string);

    add_clock(id_hash, label, time_zone);
}


function add_clock(id, label, timezone) {
    // Check the validity of this clock
    var clocks_with_this_id = clocks.filter(c => (c.id == id));
    if (clocks_with_this_id.length >= 1) {
        console.log(`A clock already exists with the ID ${id} (${label})`);
        return;
    }

    clocks.push({ "id": id, "label": label, "timezone": timezone });
    localStorage.setItem("clocks", JSON.stringify(clocks));

    // Add clocks to the page and activate them
    var main_content_el = document.getElementById('main-content');
    var section_el = document.createElement("div");
    section_el.classList.add("section");
    var close_button_el = document.createElement("button");
    close_button_el.classList.add("close_button");
    close_button_el.onclick = function () { remove_clock(id); }
    close_button_el.title = "Remove this clock";
    close_button_el.innerHTML = "🗙"
    var clock_el = document.createElement("div");
    clock_el.classList.add("digital_clock");
    clock_el.id = id;
    clock_el.dataset.label = label;
    clock_el.dataset.timezone = timezone;
    section_el.append(clock_el, close_button_el);
    main_content_el.insertBefore(section_el, document.getElementById("add_clock_button"));

    initialize_digital_clock(clock_el.id, clock_el.dataset.timezone, clock_el.dataset.label);
}

function remove_clock(id) {
    // Remove clock from the storage
    clocks = clocks.filter(c => !(c.id == id));
    localStorage.setItem("clocks", JSON.stringify(clocks));
    // ar = ar.filter(item => !(item > 3));

    // Remove the element from the DOM
    var clock_section_el = document.getElementById(id).parentElement;
    clock_section_el.remove();
}

function reset_clocks() {
    // Reset the storage
    localStorage.removeItem("clocks");

    // Remove all clocks from the page
    var c = document.querySelectorAll(".digital_clock");
    c.forEach(function (e) {
        e.parentElement.remove();
    })

    // Re-initialize the page
    initialize_page()
}
