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
    this.resetGame();
  
    startOverlay.style.display = 'none';
    phraseUl.innerHTML = '';

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  
  getRandomPhrase(){
    return this.phrases[Math.floor(Math.random() * this.phrases.length)]
  }
  

  handleInteraction(letter){
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
    lives[this.missed].firstChild.src = 'images/lostHeart.png'
    this.missed += 1;
    if (this.missed === 5){
      this.gameOver();
    }
  }


  checkForWin(){
    const shownLetters = document.querySelectorAll('.show');
    const phraseLetters = document.querySelectorAll('.letter');
    if(shownLetters.length < phraseLetters.length){
      return false;
    } else {
      return true;
    }
  }


  gameOver(){
    const gameOverMsg = document.querySelector('#game-over-message');
    if(this.checkForWin()){
      startOverlay.className = 'win';
      gameOverMsg.innerText = 'Congratulations you won!';
    } else {
      startOverlay.className = 'lose';
      gameOverMsg.innerText = 'Oh no! You lost! Try again?';
    }
    startOverlay.style.display = 'block';
  }

  resetGame(){  
    for (let i = 0; i < keyboardLetters.length; i++){
      keyboardLetters[i].disabled = false;
      keyboardLetters[i].className = 'key';
    }

    for(let i = 0; i < lives.length; i++){
      lives[i].firstChild.src = 'images/liveHeart.png'
    }
  }

}