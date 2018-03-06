/*
 * Create a list that holds all of your cards
 */
var cards = [
  {
  id: 0,
  img: "../img/chase.jpg"
},
{
  id: 1,
  img: "../img/everest.jpg"
},
{
  id: 2,
  img: "../img/marshall.jpg"
},
{
  id: 3,
  img: "../img/rocky.jpg"
},
{
  id: 4,
  img: "../img/rubble.jpg"
},
{
  id: 5,
  img: "../img/ryder.jpg"
},
{
  id: 6,
  img: "../img/skye.jpg"
},
{
  id: 7,
  img: "../img/zuma.jpg"
}
];

var duplicate = [
  {
  id: 8,
  img: "../img/chase.jpg"
},
{
  id: 9,
  img: "../img/everest.jpg"
},
{
  id: 10,
  img: "../img/marshall.jpg"
},
{
  id: 11,
  img: "../img/rocky.jpg"
},
{
  id: 12,
  img: "../img/rubble.jpg"
},
{
  id: 13,
  img: "../img/ryder.jpg"
},
{
  id: 14,
  img: "../img/skye.jpg"
},
{
  id: 15,
  img: "../img/zuma.jpg"
}
];

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
shuffle(cards);
shuffle(duplicate);
console.log(cards);
console.log(duplicate);

console.log(tiles[3].src)
// loop through all the cards and add them to the

// cards.forEach(card in cards) {
//   document.getElementsTagName('')
// }

// Event listener to flip and show the cards
deck.addEventListener('click', function openCard(e) {
  e.preventDefault();
  e.target.className += " open";
  setTimeout(500);
  e.target.className += " show";
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
