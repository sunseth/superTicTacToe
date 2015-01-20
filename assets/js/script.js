$(document).ready(function(){
    var squares = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]
    , [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

    var bigSquares = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    function squareDone(squarePos, player){
        var check = player + 1;
        var squareArray = squares[squarePos];

        for (var i = 0; i < 3; i++) {
            var pos = i * 3;
            if (squareArray[pos] == check && squareArray[pos + 1] == check && squareArray[pos + 2] == check){
                bigSquares[squarePos] = check;
                return true;
            }
        };
        for (var i = 0; i < 3; i++) {
            if (squareArray[i] == check && squareArray[i + 3] == check && squareArray[i + 6]== check ){
                bigSquares[squarePos] = check;
                return true;
            }
        };
        if (squareArray[0] == check && squareArray[4] == check && squareArray[8] == check){
            bigSquares[squarePos] = check;
            return true;
        }
        if (squareArray[2] == check && squareArray[4] == check && squareArray[6]== check){
            bigSquares[squarePos] = check;
            return true;
        }
        return false;
    }

    function gameOver(player){
        var check = player + 1;
        for (var i = 0; i < 3; i++) {
            var pos = i * 3;
            if (bigSquares[pos] == check && bigSquares[pos + 1] == check && bigSquares[pos + 2] == check){
                if (player == 0){
                    gameChangeColor(pos, pos + 1, pos + 2, 'yellow');
                }
                else{
                    gameChangeColor(pos, pos + 1, pos + 2, '#FF00FF');
                }
                return true;
            }
        };
        for (var i = 0; i < 3; i++) {
            if (bigSquares[i] == check && bigSquares[i + 3] == check && bigSquares[i + 6] == check){
                if (player == 0){
                    gameChangeColor(i, i + 3, i + 6, 'yellow');
                }
                else{
                    gameChangeColor(i, i + 3, i + 6, '#FF00FF');
                }
                return true;
            }
        };
        if (bigSquares[0] == check && bigSquares[4] == check && bigSquares[8] == check){
            if (player == 0){
                    gameChangeColor(0, 4, 8, 'yellow');
                }
            else{
                    gameChangeColor(0, 4, 8, '#FF00FF');
                }
            return true;
        }
        if (bigSquares[2] == check && bigSquares[4] == check && bigSquares[6] == check){
            if (player == 0){
                    gameChangeColor(2, 4, 6, 'yellow');
                }
            else{
                    gameChangeColor(2, 4, 6, '#FF00FF');
                }
            return true;
        }
        return false;
    }

    function gameChangeColor(pos1, pos2, pos3, color){
        $('#innerBoard' + pos1).css({
                        'border' : '5px solid ' + color,
                        'transition' : '1s'
                    });
        $('#innerBoard' + pos2).css({
                        'border' : '5px solid ' + color,
                        'transition' : '1s'
                    });
        $('#innerBoard' + pos3).css({
                        'border' : '5px solid ' + color,
                        'transition' : '1s'
                    });
    }

    var player = 1;
    var lastInnerSquare = -1;
    var lastInnerSquareHolder = null;
    var anyValid = true;
    var gameIsOver = false;

    $('.square').click(function(){
        console.log(gameIsOver);
        if (gameIsOver){
            return;
        }
        var squareID = $(this).attr('id');

        var largeSquarePos = squareID.substring(0, 1);
        var smallSquarePos = squareID.substring(1);

        var innerSquare = $(this).parent().parent();
        var outerSquare = innerSquare.parent().parent();
        if (bigSquares[largeSquarePos - 1] > 0){
            return;
        }
        if (lastInnerSquare == -1 || anyValid){
            lastInnerSquare = largeSquarePos - 1;
            anyValid = false;
        }
        else{
            if (largeSquarePos - 1 != lastInnerSquare){
                return;
            }
            $(lastInnerSquareHolder).css({
                    'border' : '5px solid black',
                    'transition' : '1s'
                });
        }

        if (squares[largeSquarePos - 1][smallSquarePos] == 0){
            if (bigSquares[smallSquarePos] > 0){
                anyValid = true;
            }
            if (player == 0){
                $("#player1").fadeOut("slow");
                $("#player1").fadeIn("slow");
                $(this).css("background-color", "#FF8300");
                $(this).css("border", "4px solid #FF00FF");
                player = 1 - player;
                squares[largeSquarePos - 1][smallSquarePos] = player + 1;
            }
            else{
                $("#player2").fadeOut("slow");
                $("#player2").fadeIn("slow");
                $(this).css("background-color", "#00FFFF");
                $(this).css("border", "4px solid yellow");
                player = 1 - player;
                squares[largeSquarePos - 1][smallSquarePos] = player + 1;
            }

            var largeSquare = '#innerBoard' + smallSquarePos;
            lastInnerSquareHolder = largeSquare;
            lastInnerSquare = smallSquarePos;

            if (!anyValid){
                if (player == 0){
                    $(largeSquare).css({
                        'border' : '5px solid #FF00FF',
                        'transition' : '1s'
                    });}
                else{
                    $(largeSquare).css({
                        'border' : '5px solid yellow',
                        'transition' : '1s'
                    });
                }
            }

            if (squareDone(largeSquarePos - 1, player)){
                if (player == 0){
                    innerSquare.css("background-color", "black");
                    innerSquare.children("div").css("background-color", "black");
                    innerSquare.find('.innerBoardContainer').css('border','2px solid black');
                }   
                else{
                    innerSquare.css("background-color", "black");
                    innerSquare.children("div").css("background-color", "black");
                    innerSquare.find('.innerBoardContainer').css('border','2px solid black');
                }
            }
            if (gameOver(player)){
                var whole = innerSquare.parent().parent();
                whole.css("background-color", "black");
                if (player == 0){
                    $("#player1").css("color", "black");
    
                    $("#player2").css("color", "white");
                }
                else{
                    $("#player1").css("color", "white");
                    $("#player2").css("color", "black");
                }
                gameIsOver = true;
            }      
        }
        
    });
});