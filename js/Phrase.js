// phrase class
class Phrase {
  constructor(phrase){
    this.phrase = phrase.toLowerCase();
  }
  
  
  addPhraseToDisplay(){
    //create an li element for each letter and space in the selected phrase
    for (let i = 0; i < this.phrase.length; i++){
      const phraseLetter = document.createElement('LI');
      phraseLetter.textContent = this.phrase[i];

      //give each character in the phrase the appropriate class name
      if(alphanumRegex.test(this.phrase[i])){
        phraseLetter.className += 'hide letter ' + this.phrase[i];
      } else if(whiteSpaceRegex.test(this.phrase[i])){
        phraseLetter.className += 'space';
      }

      //append the new li elements to the ul container
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
    //create a list of all the elements with the class matching the given letter
    const matchedLettter = document.querySelectorAll(`.${letter}`);
    //go through the list, turn off class name 'hide', turn on class name 'show'
    for (let i = 0; i < matchedLettter.length; i++){
     matchedLettter[i].classList.toggle('hide');
     matchedLettter[i].classList.toggle('show');                      
    }  
  }
}
