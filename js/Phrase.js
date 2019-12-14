// phrase class
class Phrase {
  constructor(phrase){
    this.phrase = phrase.toLowerCase();
  }
  
  
  addPhraseToDisplay(){
    for (let i = 0; i < this.phrase.length; i++){
      const phraseLetter = document.createElement('LI');
      phraseLetter.textContent = this.phrase[i];
  
      if(alphanumRegex.test(this.phrase[i])){
        phraseLetter.className += 'hide letter ' + this.phrase[i];
      } else if(whiteSpaceRegex.test(this.phrase[i])){
        phraseLetter.className += 'space';
      }

      phraseUl.appendChild(phraseLetter);
    }
  }
  
  
  checkLetter(letter){
    if(this.phrase.includes(letter)){
      return true;
    } else {
      return false;
    }
  }


  showMatchedLetter(letter){
    const matchedLettter = document.querySelectorAll(`.${letter}`);
    for (let i = 0; i < matchedLettter.length; i++){
     matchedLettter[i].classList.toggle('hide');
     matchedLettter[i].classList.toggle('show');                      
    }  
  }
}
