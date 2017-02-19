const SIZE_N = 5;
const SIZE_M = 5;
const MAX_CLICK_NUMBER = 9;

document.addEventListener("DOMContentLoaded", ready);

function ready() {

    var table = document.createElement("table");
    document.getElementById("game_area").appendChild(table);

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

    function showSquare(number, clickNumber, startTime) {
        if (clickNumber == 1) {
            startTime = performance.now();
        }
        if (clickNumber > MAX_CLICK_NUMBER) {
            var finishTime = performance.now();
            document.getElementById("win").innerHTML = "";
            document.getElementById("game_area").innerHTML 
                = "You win! Your time: " + Math.round((finishTime - startTime)) + "ms";
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
