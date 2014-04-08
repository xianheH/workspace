//game keys
var ESC = 27;
var SPACE = 32;
var S = 83;
var bird;
var gameBoard = new GameBoard;
var height;
var drop;
var increaseScore;
var pipeNumber = 0;

$(document).ready(function() {
    $('body').keydown(keyPresseHandler);
});

function keyPresseHandler(event) {
	
	switch(event.which) {
		case S:
			startGame();
			break;
		case SPACE:
			bird.moveUp();
			break;
		case ESC:
			endGame();
			break;
	}
}

function startGame() {
	endGame();
	bird = new Bird();
	drop = setInterval(function(){
		bird.moveDown()
	}, 1000);
	increaseScore = setInterval(function(){
  		gameBoard.updateScore();
	}, 1000);
}

function endGame() {
	gameBoard.createPipe("pipe"+pipeNumber, "pipeTop", "pipe");
	pipeNumber++;
	gameBoard.createPipe("pipe"+pipeNumber, "pipeBottom", "pipe1");
	gameBoard.clearBoard();
	gameBoard.clearGameInfo();
};

function GameBoard() {

	this.createPipe = function(className, idName, image){
		$pipe = $('<div/>').addClass(className);
		$pipe.prepend('<img id=' + idName +' src=' + image + '.png />');
		$('#gameField').append($pipe);
	};
	
	this.clearBoard = function(){
		$('div.bird').remove();
	};
	
	this.clearGameInfo = function() {
		height = 60;
		$('#score').html('0');
		$('#gamemsg').css('visibility','hidden');
		$('#speed').html('1');
	};
		
	this.updateScore = function() {
		var $currentScore = Number($('#score').html());
		$currentScore+=10;
		$('#score').html($currentScore);
	};
	
	this.showLoseMessage = function(){
		$('#gamemsg').css('visibility','visible');
	};
	
	this.showNextRoundMsg = function() {
		$('#nextRndMsg').hide().css({visibility: 'visible'}).fadeIn(2000);
		$('#nextRndMsg').fadeOut(2000, function() {
				$(this).show().css({visibility: 'hidden'});
			});
			
		var $currentSpeed = Number($('#speed').html());
		$currentSpeed++;
		$('#speed').html($currentSpeed);
	};
}

function Bird() {
	var $bird;
	$bird = $('<div/>').addClass('bird');
	$bird.prepend('<img id="bird" src="teemo.jpg" />');
	$('#gameField').append($bird);
	$('#bird').css('position', 'absolute');
	$('#bird').css('top', height+'px');

	this.moveUp = function(){
		height-=10;
		if (height < 0) {
			height = 0;
		}
		$('#bird').css('top', height+'px');
	};

	this.moveDown = function(){
		height+=20;
		if (height > 290) {
			gameBoard.clearBoard();
			gameBoard.showLoseMessage();
			clearInterval(increaseScore);
			clearInterval(drop);
		}
		$('#bird').css('top', height+'px');
	}
};