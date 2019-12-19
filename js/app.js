// global variables
const alphanumRegex = /\w/;
const whiteSpaceRegex = /\s/;
const phraseUl = document.querySelector('#phrase ul');
const startOverlay = document.querySelector('#overlay');
const startButton = document.querySelector('#btn__reset');
const keyboardLetters = document.querySelectorAll('#qwerty button');
const lives = document.querySelectorAll('.tries');
let newGame;

//event handler for start button
startButton.addEventListener('click', function(){
 newGame = new Game();
  newGame.startGame();
});

/*event handlers for on-screen keyboard letters, 
call handleInteraction method whenever a letter is clicked on*/
for(let i = 0; i < keyboardLetters.length; i++){
  keyboardLetters[i].addEventListener('click', function(e){
  newGame.handleInteraction(e.target.innerText);
  });
}
