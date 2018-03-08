/*
 * Create a list that holds all of your cards
 */
 var cardsOrig = [
   {card: 1,
    img: "img/chase.jpg"
   },
   {card: 2,
    img: "img/everest.jpg"
   },
   {
    card: 3,
    img: "img/marshall.jpg"
   },
   {
     card: 4,
     img: "img/rocky.jpg"
   },
   {
     card: 5,
     img: "img/rubble.jpg"
   },
   {
     card: 6,
     img: "img/ryder.jpg"
   },
   {
     card: 7,
     img: "img/skye.jpg"
   },
   {
     card: 8,
     img: "img/zuma.jpg"
   }];

var moves = 0;
var deck = document.querySelector('.deck');  // the unordered list that contains all the cards
var tiles = document.querySelectorAll('.card'); // selects all the list items and adds them to the tiles variable



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

shuffle(cardsOrig);
let cardsTop = cardsOrig.slice(0);
shuffle(cardsOrig);
let cardsBottom = cardsOrig.slice(0);
let cards = cardsTop.concat(cardsBottom);
shuffle(cards);
console.log(cards);

//  var third = tiles[3].children.item(0);
//  third.setAttribute('src', 'img/marshall.jpg');
// console.log(tiles[3].children.item(0));
// loop through all the cards and add them to the
for (i = 0 ; i < cards.length; i++) {
  tiles[i].children.item(0).setAttribute('src', cards[i].img);
  tiles[i].children.item(0).setAttribute('data-card', cards[i].card);
}


// cards.forEach(card in cards) {
//   document.getElementsTagName('')
// }
let clickCounter = 0;
// Event listener to flip and show the cards
deck.addEventListener('click',  function openCard(e) {
  e.preventDefault();
  e.target.className += " open";
  setTimeout(function(){
    e.target.className += " show";
  //  e.setAttribute('data-cards', cards[])
  }, 500);
  // if (e.target.getAttribute('src') === )
  console.log(e.target.children.item(0).getAttribute('data-card'));
  
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
