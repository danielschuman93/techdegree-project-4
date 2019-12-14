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
    startOverlay.style.display = 'none';
    phraseUl.innerHTML = '';
  
    for (let i = 0; i < keyboardLetters.length; i++){
      keyboardLetters[i].disabled = false;
      keyboardLetters[i].className = 'key';
    }

    for(let i = 0; i < lives.length; i++){
      if(lives[i].firstChild.src === 'http://port-80-m3h0z6bti2.treehouse-app.com/images/lostHeart.png'){
        lives[i].firstChild.src = 'http://port-80-m3h0z6bti2.treehouse-app.com/images/liveHeart.png';
      }
    }

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  
  getRandomPhrase(){
    return this.phrases[Math.floor(Math.random() * this.phrases.length)]
  }
  

  handleInteraction(letter){
    if (newGame.activePhrase.checkLetter(letter)){
      newGame.activePhrase.showMatchedLetter(letter);
      for (let i = 0; i < keyboardLetters.length; i++){
        if(keyboardLetters[i].innerText.includes(letter)){
          keyboardLetters[i].disabled = true;
          keyboardLetters[i].className = 'chosen';
          if(newGame.checkForWin()){
            newGame.gameOver();
          }
        }
      };
    } else {
      newGame.removeLife();
      for (let i = 0; i < keyboardLetters.length; i++){
        if(keyboardLetters[i].innerText.includes(letter)){
          keyboardLetters[i].disabled = true;
          keyboardLetters[i].className = 'wrong';
        }
      }
    }
  }
  

  removeLife(){
    for(let i = 0; i < lives.length; i++){
      if(lives[i].firstChild.src === 'http://port-80-m3h0z6bti2.treehouse-app.com/images/liveHeart.png'){
        lives[i].firstChild.src = 'http://port-80-m3h0z6bti2.treehouse-app.com/images/lostHeart.png';
        break;
      }
    }
    this.missed += 1;
    if (this.missed === 5){
      newGame.gameOver();
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
    if(newGame.checkForWin()){
      startOverlay.className = 'win';
      gameOverMsg.innerText = 'Congratulations you won!';
    } else {
      startOverlay.className = 'lose';
      gameOverMsg.innerText = 'Oh no! You lost! Try again?';
    }
    startOverlay.style.display = 'block';
  }
}