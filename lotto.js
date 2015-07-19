function getWinnings(matches, megaballMatch) {
    'use strict';
    if (matches == 0) {
        return 1;   
    } else if (matches == 1) {
        return 2;
    } else if (matches == 2) {
        return 5;
    } else if (matches == 3) {
        if (megaballMatch) {
            return 50;
        } else {
            return 5;
        }
    } else if (matches == 4) {
        if (megaballMatch) {
            return 5000;
        } else {
            return 500;
        }
    } else { // matches == 5
        if (megaballMatch) {
            return 'jackpot';
        } else {
            return 1000000;
        }
    }
}

function getNumbers() {
    'use strict';
    var myNumbers = JSON.parse($("#boards").val());
    myNumbers.year = $("#year").val();
    myNumbers.month = $("#month").val();
    return myNumbers;
}

function resultsReturned(data, textStatus, jqXHR) {
    'use strict';
    var myNumbers = getNumbers();
    var winners = [];
    myNumbers.boards.forEach(function(board, boardIndex) {
        var numbers = board.numbers.split(" ");
        data.forEach(function(drawing, drawingIndex) {
            var winningNumbers = drawing.winning_numbers.split(" ");
            var matches = $(numbers).filter(winningNumbers);
            var numMatches = matches.length;
            var megaballMatch = board.mega_ball === drawing.mega_ball;
            if (megaballMatch || matches > 2) {
                var winner = {};
                winner.index = boardIndex;
                winner.board = board.numbers + " " + board.mega_ball;
                winner.winning_number = drawing.winning_numbers + " " + drawing.mega_ball;
                winner.matches = matches.get().join(" ") + (megaballMatch ? " " + board.mega_ball : "");
                winner.amount = getWinnings(numMatches, megaballMatch);
                winners.push(winner);
            }
        });
    });
    $("#results").html(JSON.stringify(winners, null, 2));
}

function checkEm() {
    'use strict';
    var myNumbers = getNumbers();
    if (myNumbers.month !== undefined && myNumbers.month.length === 2 && myNumbers.year !== undefined && myNumbers.year.length === 4) {
        var nextMonth = parseInt(myNumbers.month) + 1;
        var nextYear = parseInt(myNumbers.year);
        if (nextMonth > 12) {
            nextMonth = 1;
            nextYear++;
        }
        if (nextMonth < 10) {
            nextMonth = '0' + nextMonth.toString();
        }
        var url = "https://data.ny.gov/resource/h6w8-42p9.json?$where=draw_date between '";
        url += myNumbers.year + "-" + myNumbers.month + "-02T00:00:00' and '";
        url += nextYear + "-" + nextMonth + "-01T00:00:00'";
        $.ajax({
            url: url,
            type: "GET",
            success: resultsReturned,
            dataType: "json"
        });
    } else {
        $("#results").html('there was a problem; check your month and year');
    }
}