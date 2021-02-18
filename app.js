const target = document.querySelector('.memory');
const numberOfCards = 16;
const numberOfPairs = numberOfCards/2;

const createCard = (content) => {
   let card = document.createElement('div');
   card.classList.add('card')
   card.innerHTML = content;

   target.append(card)
}

const getLetters = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let letters = []

    for(var i = 0; i < numberOfPairs; i++ ){
        letters.push(alphabet.splice(Math.floor(Math.random()*alphabet.length), 1));
      }

    return letters;
}

const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

const checkComplte = () => {
    if( document.querySelectorAll('.solved').length === numberOfCards-1){
        alert('nailed it')
    }
}

const cardLogic = (target) => {

    target.classList.add('selected');

    let currentCards = document.querySelectorAll('.card.selected');

    if(currentCards.length >= 2 && currentCards[0].innerHTML === currentCards[1].innerHTML){
        setTimeout(() => { 
            currentCards.forEach(card => {
                card.classList.remove('selected')
                card.classList.add('solved')
                checkComplte();
            })
        }, 1500)
    } else if(currentCards.length >= 2) {
        setTimeout(() => { 
            currentCards.forEach(card => {
                card.classList.remove('selected')
            })
        }, 1500)
    }

}


let letters = getLetters();
let cards = shuffle([...letters, ...letters]);

cards.forEach(card => createCard(card))

document.addEventListener('click', (event) => {

    if(event.target.matches('.card')){
        if(document.querySelectorAll('.card.selected').length < 2){
            cardLogic(event.target);
        }
    }

})