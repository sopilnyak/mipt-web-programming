SIZE_N = 5;
SIZE_M = 5;
maxClickNumber = 9;

document.addEventListener("DOMContentLoaded", ready);

function generateNumber() {
    var form = document.forms.setNumber;
    var steps = form.elements.input.value;
    if (steps < 1 || steps > 1000) {
        alert("Wrong number: enter positive integer from 1 to 1000");
    }
    maxClickNumber = steps - 1;
}

function ready() {

    /* Ractive Example */

    var ractive = new Ractive({
        el: '#information',
        template: '#template',
        data: {
            instance: {
                id: Math.round(Math.random() * 10000),
                code: Math.round(Math.random() * 100000)
            },
            rules: 'Click the squares as quickly as possible.',
            formatter: codeFormatter,
            isRulesShown: false,
        }
    });

    function codeFormatter(code) {
        return 'id' + code;
    }

    ractive.on({
        show_message: function() {
            document.getElementById("about").className = "rules";
        },
        hide_message: function() {
            document.getElementById("about").className = "hidden";
            ractive.set({
                isRulesShown: true
            })
        }
    });

    var ractiveTop = new Ractive({
        el: '#game',
        template: '#template_top',
        data: {
            isBootstrapDeactivated: true
        }
    });
    

    ractiveTop.on({
        activate_bootstrap: function() {
            document.getElementById("activate").className = "hidden";
            document.getElementById("header").innerHTML 
                = '<link rel="stylesheet" \
                href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" \
                integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" \
                crossorigin="anonymous">'  
        }
    });


    var numbers = []

    var ractiveTable = new Ractive({
        el: '#table',
        template: '#template_table',
        data: {
            random_numbers: numbers,
            sort: function (array, column) {
                array = array.slice();
                return array.sort(function (a, b) {
                    return a[column] < b[column] ? -1 : 1;
                });
            },
            sortColumn: 'num'
        }
    });

    ractiveTable.on({
        add: function() {
            var newNumber = {
                id: Math.round(Math.random() * 10000),
                number: Math.round(Math.random() * 100000)
            };
            numbers.push(newNumber);
            ractiveTable.update('random_numbers');
        },
        sort: function (event, column) {
            this.set('sortColumn', column);
        }

    });

    /* END Ractive Example */

    /* Game */

    function play() {
        var table = document.createElement("table");
        document.getElementById("game_area").appendChild(table);

        // Generate squares
        for (var i = 0; i < SIZE_N; ++i) {
            var row = document.createElement("tr");

            for (var j = 0; j < SIZE_M; ++j) {
                var square = document.createElement("td");
                square.className = "square_hidden";

                var squareId = i * SIZE_N + j
                square.id = "square" + squareId;

                row.appendChild(square);
            }
            
            table.appendChild(row);
        }

        var square = [];
        var times = [];

        // Play the game
        function showSquare(number, clickNumber, startTime) {
            if (clickNumber == 1) {
                startTime = performance.now();
            }
            if (clickNumber > maxClickNumber) {
                var finishTime = performance.now();
                document.getElementById("win").innerHTML = "";
                document.getElementById("steps").className = "hidden"
                document.getElementById("game_area").innerHTML 
                    = "You win! Your time: " + Math.round((finishTime - startTime)) + "ms. <a href=''>Play again</a>.";
                var newTime = {
                    clickNumber: maxClickNumber,
                    time: Math.round((finishTime - startTime))
                }
                times.push(newTime);
                return;
            }
            square[number] = document.getElementById("square" + number);
            square[number].className = "square_show";

            square[number].onclick = function() { hideButton(); };

            function hideButton() {
                square[number].className = "square_hidden";
                document.getElementById("win").innerHTML = clickNumber + 1;
                square[number].onclick = function() { return false; };
                showSquare(Math.floor(Math.random() * SIZE_N * SIZE_M), ++clickNumber, startTime);
            }
        }

        showSquare(Math.floor(Math.random() * SIZE_N * SIZE_M), 0, 0);
    }

    play();

    /* END Game */
}
