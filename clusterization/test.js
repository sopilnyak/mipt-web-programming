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
