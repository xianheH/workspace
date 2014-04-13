//game keys
var ESC = 27;
var SPACE = 32;
var S = 83;
var bird;
var gameBoard = new GameBoard;
var gameEvent;
var increaseScore;
var pipeNumber = 0;
var pipeArray = new Array(); 

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
	spawn();
	gameEvent = setInterval(function(){
		bird.moveDown();
		gameBoard.updateScore();
		gameBoard.pipeMove();
	}, 1000);
}

function spawn() { 
	var pipeName ='pipe'+pipeNumber;
	gameBoard.createPipe(pipeName, pipeName, "pipe");
	var topPipeHeight = Math.floor((Math.random()*300)+1);
	gameBoard.pipeSetting(pipeName, 400-topPipeHeight, topPipeHeight, 322, 78);
	pipeArray[pipeArray.length] = pipeNumber;
	pipeNumber++;
	pipeName ='pipe'+pipeNumber;
	gameBoard.createPipe(pipeName, pipeName, "pipe1");
	var bottomPipeHeight = 320 - topPipeHeight;
	gameBoard.pipeSetting(pipeName, 0, bottomPipeHeight, 322, 78);
	pipeArray[pipeArray.length] = pipeNumber;
	pipeNumber++;
}

function endGame() {
	gameBoard.clearBoard();
	gameBoard.clearGameInfo();
};

function GameBoard() {

	this.createPipe = function(className, idName, image){
		$pipe = $('<div/>').addClass(className);
		$pipe.prepend('<img id=' + idName +' src=' + image + '.png />');
		$('#gameField').append($pipe);
	};
	
	this.pipeSetting = function (idname, top, height, left, width) {
		$('#'+idname).css('position', 'absolute');
		$('#'+idname).css('top', top+'px');
		$('#'+idname).css('height', height+'px');
		$('#'+idname).css('width', width+'px');
		$('#'+idname).css('left', left+'px');
	};

	this.pipeMove = function () {
		var canSpawn = true;
		var idname, distanceLeft;
		for (var i = 0; i < pipeArray.length; i++) {
			idname ='pipe' + pipeArray[i];
			distanceLeft = parseInt($('#'+idname).css('left')) - 30;
			$('#'+idname).css('left', distanceLeft +'px');
			if(distanceLeft < 0) {
				var pipeClass ='div.pipe'+pipeArray[i];
			    $(pipeClass).remove();
			    delete pipeArray[i];
			    if (canSpawn) {
			    	spawn();
			    }
			    canSpawn = false;
			}
		}
	}

	this.clearBoard = function(){
		if (gameEvent) {
			clearInterval(gameEvent);
		}
		$('div.bird').remove();
		var pipeClass;
		for (var i = 0; i < pipeArray.length; i++) {
			pipeClass ='div.pipe'+pipeArray[i];
			$(pipeClass).remove();
		}
		pipeNumber = 0;
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
		}
		$('#bird').css('top', height+'px');
	}
};