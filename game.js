var buttonColors = ["red", "blue" ,"green","yellow"];
var gamePatterns = [];
var userClickedPattern = []; 
var started = false;
var level = 0; 

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  
  userClickedPattern.push(userChosenColour); 
  playSound(userChosenColour);
 animatePress(userChosenColour);

 checkAnswer(userClickedPattern.length - 1);
  
}); 

function nextSequence(){
  userClickedPattern=[];
  level++; 
    var randomNumber = Math.floor(Math.random()*4); 
    var randomChosenColours = buttonColors[randomNumber];
    gamePatterns.push(randomChosenColours);
    
    $("#" + randomChosenColours).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 
    
    playSound(randomChosenColours);
  
    $("#level-title").text("Level " + level);
  

    return randomChosenColours; 

   
} 

function checkAnswer(currentLevel) {

  if (gamePatterns[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePatterns.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong"); 
    
    playSound("wrong"); 

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200); 

    $("#level-title").text("Game over! Press any key to restart."); 
    startOver();
  } }
  
  function startOver(){
    started=false;
    gamePatterns=[];
    level=0;

  }



function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
} 

function animatePress(currentColour){
  $("#" + currentColour ).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
} 


