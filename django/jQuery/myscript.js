/**
 * 
 */
var player1 = prompt('Player 1: ');
var player2 = prompt('Player 2: ');
var game_on = true;
var table = $('table tr');
var player1Color = 'rgb(237, 45, 73)';
var player1Color = 'rgb(86, 151, 255)';

function reportWin(rowNum, colNum){
  console.log('You Won');
}


function changeColor(rowNum, colNum, color){
  $(this).css('background-color', 'blue');
  return table.eq(rowNum).find('td').eq(colNum).find('button').css('background-color', color);
}

function changeColor(rowNum, colNum){
  $(this).css('background-color', 'blue');
  return table.eq(rowNum).find('td').eq(colNum).find('button').css('background-color');
}
 
function checkBottom(colIndex){
  var colorReport = returnColor(5, colIndex)
  for (var row=5; row > -1; row--){
    colorReport = returnColor(row, colIndex);
    if (colorReport === 'rgb(128, 128, 128)'){
      return row
    }
  }  
}

function colorMatchCheck(one, two, three, four) {
  return  (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

