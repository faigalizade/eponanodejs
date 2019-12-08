var x;
var i = 0;
var test = 1;
var y = 9;
var opacity;
// document.getElementById("menu").onc
function start() {

    var interval = setInterval(function () {
        if (test == 1) {
            x = document.getElementById("pp").style.left;
            document.getElementById("pp").style.left = parseInt(x) + parseInt(5) + 'px';
            i = i + 5;
            if (i == 600) {
                clearInterval(interval);
                test = 0;
                i = 0;
            }
        }

    }, 1);
    var interval2 = setInterval(function () {
        opacity = document.getElementById('epona').style.opacity;
        document.getElementById('epona').style.opacity = '.' + y;
        // alert(document.getElementById('epona').style.opacity);
        if (y != 1) {
            y = y - 1;
        }
        if (y == 1 && test == 0) {
            y = 9;
            clearInterval(interval2);
        }
    }, 20);
}

function stop() {
    if (test != 1) {
        i = 300;
        var interval3 = setInterval(function () {
            x = document.getElementById("pp").style.left;
            document.getElementById("pp").style.left = parseInt(x) - parseInt(4) + 'px';
            i = i - 4;
            if (i == -300) {
                y = 9;
                test = 0;
                clearInterval(interval3);
                test = 1;
                i = 0;


            }
        }, 1);
        var interval2 = setInterval(function () {
            opacity = document.getElementById('epona').style.opacity;
            document.getElementById('epona').style.opacity = '.' + y;
            // alert(document.getElementById('epona').style.opacity);
            if (y != 10) {
                y = y + 1;
                clearInterval(interval2);
            }

        }, 80);

    }
}