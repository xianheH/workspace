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
var birdHeight;
var MOVEDOWN = 7;
var MOVEUP = 30;
var SCORE = 5;
var PIPEMOVE = 5;
var WIDTH = 78;
var LEFT = 322;


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
	}, 100);
}

function spawn() { 
	var pipeName ='pipe'+pipeNumber;
	gameBoard.createPipe(pipeName, pipeName, "pipe2");
	var topPipeHeight = Math.floor((Math.random()*300)+1);
	gameBoard.pipeSetting(pipeName, 400-topPipeHeight, topPipeHeight, LEFT, WIDTH);
	pipeArray[pipeArray.length] = pipeNumber;
	pipeNumber++;
	pipeName ='pipe'+pipeNumber;
	gameBoard.createPipe(pipeName, pipeName, "pipe1");
	var bottomPipeHeight = 250 - topPipeHeight;
	gameBoard.pipeSetting(pipeName, 0, bottomPipeHeight, LEFT, WIDTH);
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

	this.detectCollision = function (src, idname) {
		if (src.indexOf("pipe1") !== -1 && birdHeight < parseInt($('#'+idname).css('height'))){
			gameBoard.clearBoard();
			gameBoard.showLoseMessage();
		}
		else if (src.indexOf("pipe2") !== -1 && birdHeight > parseInt($('#'+idname).css('top'))){
			gameBoard.clearBoard();
			gameBoard.showLoseMessage();
		}  
	};

	this.pipeMove = function () {
		var canSpawn = true;
		var idname, distanceLeft;
		for (var i = 0; i < pipeArray.length; i++) {
			idname ='pipe' + pipeArray[i];
			distanceLeft = parseInt($('#'+idname).css('left')) - PIPEMOVE;
			$('#'+idname).css('left', distanceLeft +'px');
			if (distanceLeft < 40) {
				this.detectCollision(document.getElementById(idname).src, idname);
			}
			if(distanceLeft < -2*WIDTH) {
				var pipeClass ='div.pipe'+pipeArray[i];
			    $(pipeClass).remove();
			    pipeArray.splice(i,1)
			    i--;
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
		birdHeight = 60;
		$('#score').html('0');
		$('#gamemsg').css('visibility','hidden');
		$('#speed').html('1');
	};
		
	this.updateScore = function() {
		var $currentScore = Number($('#score').html());
		$currentScore+=SCORE;
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
	$('#bird').css('top', birdHeight+'px');

	this.moveUp = function(){
		birdHeight-=MOVEUP;
		if (birdHeight < 0) {
			birdHeight = 0;
		}
		$('#bird').css('top', birdHeight+'px');
	};

	this.moveDown = function(){
		birdHeight+=MOVEDOWN;
		if (birdHeight > 350) {
			gameBoard.clearBoard();
			gameBoard.showLoseMessage();
		}
		$('#bird').css('top', birdHeight+'px');
	}
};