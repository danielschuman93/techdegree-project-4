//Game class
class Game {
  constructor(){
    this.missed = 0;
    this.phrases = [new Phrase('Hello World'),
                    new Phrase('What are you looking at'),
                    new Phrase('May the force be with you'),
                    new Phrase('A penny saved is a penny earned'),
                    new Phrase('Cant touch this')];
    this.activePhrase = null;
  }
  
  
  startGame(){
    //reset the game whenever a new game is started
    this.resetGame();
  
    //remove the start overlay when game is started
    startOverlay.style.display = 'none';
    //reset the phrase container
    phraseUl.innerHTML = '';

    //get new phrase and add it to display
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  
  getRandomPhrase(){
    //return phrase with random index between 0 and the total number of phrases
    return this.phrases[Math.floor(Math.random() * this.phrases.length)]
  }
  

  handleInteraction(letter){
    /*if chosen letter is a match, show letter in the phrase, 
    disable letter on on-screen keyboard, give letter class name 'chosen', 
    check to see if game is won, if so end game*/
    if (this.activePhrase.checkLetter(letter)){
      this.activePhrase.showMatchedLetter(letter);
      for (let i = 0; i < keyboardLetters.length; i++){
        if(keyboardLetters[i].innerText.includes(letter)){
          keyboardLetters[i].disabled = true;
          keyboardLetters[i].className = 'chosen';
          if(this.checkForWin()){
            this.gameOver();
          }
        }
      };
      /*if chosen letter is not a match, remove life,
      disable letter on on-screen keyboard, give letter class name 'wrong'*/
    } else {
      this.removeLife();
      for (let i = 0; i < keyboardLetters.length; i++){
        if(keyboardLetters[i].innerText.includes(letter)){
          keyboardLetters[i].disabled = true;
          keyboardLetters[i].className = 'wrong';
        }
      }
    }
  }
  

  removeLife(){
    /*replace live heart image with lost heart image; 
    select element with index equal to this.missed which will be a number between 0 and 4*/
    lives[this.missed].firstChild.src = 'images/lostHeart.png'

    //increment game's missed property by 1
    this.missed += 1;

    //if missed property is equal to 5, end the game
    if (this.missed === 5){
      this.gameOver();
    }
  }


  checkForWin(){
    //create list of all shown letters
    const shownLetters = document.querySelectorAll('.show');

    //create list of total phrase letters
    const phraseLetters = document.querySelectorAll('.letter');

    //check if the amount of shown letters is less than the total amount of letters in the phrase
    if(shownLetters.length < phraseLetters.length){
      return false;
    } else {
      return true;
    }
  }


  gameOver(){
    //select element holding game over message
    const gameOverMsg = document.querySelector('#game-over-message');

    //if the game has been won display the 'win' overlay with a winning message
    if(this.checkForWin()){
      startOverlay.className = 'win';
      gameOverMsg.innerText = 'Congratulations you won!';

    //if the game has been lost display the 'lose' overlay with a losing message
    } else {
      startOverlay.className = 'lose';
      gameOverMsg.innerText = 'Oh no! You lost! Try again?';
    }

    //display the start overlay
    startOverlay.style.display = 'block';
  }

  resetGame(){
    //re-enable all the on-screen keyboard letters and reset all class names to 'key'
    for (let i = 0; i < keyboardLetters.length; i++){
      keyboardLetters[i].disabled = false;
      keyboardLetters[i].className = 'key';
    }

    //reset all the hearts to live hearts
    for(let i = 0; i < lives.length; i++){
      lives[i].firstChild.src = 'images/liveHeart.png'
    }
  }

}