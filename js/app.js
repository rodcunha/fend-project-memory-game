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

var moveCounter = 1;
var deck = document.querySelector('.deck');  // the unordered list that contains all the cards
var tiles = document.querySelectorAll('.card'); // selects all the list items and adds them to the tiles variable
let movesElem = document.querySelector('.moves'); // selects the moves class span in the HTML
let cards, cardsTop, cardsBottom;


//shuffling of the cards
function shuffleCards() {
  shuffle(cardsOrig);
  cardsTop = cardsOrig.slice(0);
  shuffle(cardsOrig);
  cardsBottom = cardsOrig.slice(0);
  cards = cardsTop.concat(cardsBottom);
  shuffle(cards);
  console.log(cards);
};

//function to count the moves.
var moves = deck.addEventListener('click', function() {
  movesElem.innerHTML = moveCounter;
});

// function to remove the stars from the score
function starCount() {
  if (moveCounter === 10) { // when the move counter reaches 10 remove the star
    document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');
    console.log('drop one star');
  } else if (moveCounter === 20) {
    document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');
    console.log('drop second star');
  }
}

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


function startGame() {
  shuffleCards();
  //  var third = tiles[3].children.item(0);
  //  third.setAttribute('src', 'img/marshall.jpg');
  // console.log(tiles[3].children.item(0));
  // loop through all the cards and add them to the
  for (i = 0 ; i < cards.length; i++) {
    tiles[i].children.item(0).setAttribute('src', cards[i].img);
    tiles[i].setAttribute('data-card', cards[i].card);
  }

  let clickCounter = 1;
  let cardOne, cardTwo;

  // Event listener to flip and show the cards
  deck.addEventListener('click',  function openCard(e) {
    e.preventDefault();
    e.target.className += " open";
    setTimeout(function(){
      e.target.className += " show";
    }, 500);
    console.log(clickCounter);

    //function to distinguish between the first click and the second
    function assignValues() {

      let list = document.querySelector('.deck');

      if (clickCounter === 1 && !e.target.getAttribute('.show') && e.target != list ) {
        cardOne = e.target;
        console.log(cardOne);
        cardOne.getAttribute('data-card');
        clickCounter++
      } else if (clickCounter === 2 && !e.target.getAttribute('.show') && e.target != list) {
        cardTwo = e.target;
        console.log(cardTwo);
        cardTwo.getAttribute('data-card');
        clickCounter = 1;
        starCount();
        moveCounter++
      }
    }; // is counting everytime we click an open card, need to fix
    assignValues();

    // // check if the card is open
    // if (cardOne.getAttribute('data-open') === "yes") {
    //   console.log('clicked an open card, counter stays the same');
    // } else {
    // clickCounter++;
    // cardOne.removeAttribute('data-open')
    // }

    let cardOneVal = cardOne.getAttribute('data-card'); //assign the value of data-card attribute of the first click to a variable
    let cardTwoVal = cardTwo.getAttribute('data-card'); //assign the value of the data-card attribute for the 2nd click to a variable
    console.log(cardOneVal + " " + cardTwoVal);
    // function to match the data-card values
    function matchCards() {
      if (cardOneVal === cardTwoVal) { // if the values of the data-card attribute are the same add class match.
        console.log('they match');
        cardOne.className += ' match';
        cardTwo.className += ' match';
        cardOne, cardTwo = undefined;
      } else if (cardOneVal != cardTwoVal && cardTwoVal != undefined) {
          console.log("they don't match");
          cardOneVal = undefined;
          cardTwoVal = undefined;

          setTimeout(function() { //add a slight timer for the cards to be shown before they are flipped back when they don't match
            if (cardOneVal == undefined && cardTwoVal == undefined) {
              setTimeout(function() {
                cardTwo.classList.remove('show');
                cardOne.classList.remove('show');
              }, 250);

              setTimeout(function() {
              //  console.log("card one: " + cardOne + "   cardTwo: " + cardTwo);
                cardOne.classList.remove('open');
                cardTwo.classList.remove('open');
              }, 600);
          }
        }, 600);
      }
    }
    if ( clickCounter == 1 ) { matchCards(); }
    console.log(document.querySelector('.fa-star:last-of-type'));
});
}
startGame();

//function to restart the game
const restart = document.querySelector('.fa-repeat');
function restartGame() {
  console.log('restart clicked');
  moveCounter = 1;
  const stars = document.querySelectorAll('.fa');
  const cards = document.querySelectorAll('.card');
  stars.forEach(function(e) {
    e.classList += ' fa-star';
  });
  cards.forEach(function(e) {
      e.classList.remove('show', 'open', 'match');
  });
  setTimeout(function() {
    startGame();
  }, 1000);
}
restart.addEventListener('click', function() {
  restartGame();
}); //number of moves go increases x2 when the restart function is clicked.

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
