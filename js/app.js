const cardsPawPatrol = [
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

  let checkCards = [];

  let moveCounter = 1;
  const deck = document.querySelector('.deck');  // the unordered list that contains all the cards
  const tiles = document.querySelectorAll('.card'); // selects all the list items and adds them to the tiles variable
  const movesElem = document.querySelectorAll('.moves'); // selects the moves class span in the HTML
  const restart = document.querySelector('.fa-repeat'); // selects the restart icon
  //const selectDeck = document.querySelectorAll('.chooseDeck'); //selects all the buttons with chooseDeck class
  let cards, cardsTop, cardsBottom;
  let cardOne, cardTwo;
  let counter = 1;

  //function to count the moves.
  var moves = deck.addEventListener('click', function() {
    movesElem.forEach(function(e) {
      e.innerHTML = moveCounter;
    });
  });

  // function to remove the stars from the score
  function starCount() {
    console.log('moveCounter = ' + moveCounter);
    if (moveCounter === 15) { // when the move counter reaches 15 remove the star
      document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');
      console.log('drop one star');
    } else if (moveCounter === 30) { // when the move counter reaches 15 remove the star
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

  //shuffling of the cards
  function shuffleCards() {
    cardsTop = cardsPawPatrol.slice(0);
    cardsBottom = cardsPawPatrol.slice(0);
    cards = cardsTop.concat(cardsBottom);
    shuffle(cards);
  };

  //function to assign the images
  function assignImg() {
    for (i = 0 ; i < cards.length; i++) {
      tiles[i].children.item(0).setAttribute('src', cards[i].img);
      tiles[i].setAttribute('data-card', cards[i].card);
    }
  }

  // reveal the cards and push them to the array to check
  function showCard() {
    deck.addEventListener('click',  function(e) {  //when the deck element is clicked
      e.stopImmediatePropagation();
      e.preventDefault();
      e.target.className += " open";
      setTimeout(function(){
        e.target.className += " show";
      }, 500);

      const cardId = e.target.getAttribute('data-card');

      if (cardId != null && cardId != undefined) {
        checkCards.push(cardId);
        console.log(checkCards);
      }

      // function  to assign the values to the cards
      console.log('counter: ' + counter);

      function assignValues() {

          if (counter === 1 && !e.target.getAttribute('.show') && e.target != deck) {
            cardOne = e.target;
            counter++;
          } else if (counter === 2 && !e.target.getAttribute('.show') && e.target != deck) {
            cardTwo = e.target;
            counter = 1;
            starCount();
         }
      }
      assignValues();

      // function to match the cards
      function matchCards() {

        const matchOne = checkCards[checkCards.length - 2];
        const matchTwo = checkCards[checkCards.length-1];
        const openCards = document.getElementsByClassName('open show');
        console.log(openCards);

        console.log('cardOne: ' + cardOne + " --- cardTwo: " + cardTwo );
        if ( (checkCards.length % 2) === 0 && matchOne === matchTwo && e.target != deck ) {
          cardOne.className += " match";
          cardTwo.className += " match";

          moveCounter++;
          console.log('The cards match');

        } else if ( checkCards.length % 2 === 0 && matchOne != matchTwo && e.target != deck ) {
          console.log(matchOne + "-" + matchTwo + 'They are not a match');
          checkCards.splice(-2, 2);
          setTimeout(function() {
            //console.log('cardOne: ' + cardOne + '=' + 'cardTwo' + cardTwo);
            cardOne.classList.remove('show');
            cardTwo.classList.remove('show');
          setTimeout(function() {
            cardOne.classList.remove('open');
            cardTwo.classList.remove('open');
          }, 500);
        }, 700);
        moveCounter++;
        }
      } // end of match cards
      matchCards();
      showModal();
    });
  }

  function startGame() {
    shuffleCards();
    assignImg();
    showCard();
  }

  function restartGame() {
    const stars = document.querySelectorAll('.fa');
    const cards = document.querySelectorAll('.card');
    const clearCards = document.querySelectorAll('.show');

    console.log('restart clicked');
    moveCounter = 1;
    movesElem[0].innerHTML = moveCounter;
    stars.forEach(function(e) {
      e.classList += ' fa-star';
    });
    clearCards.forEach(function(e) {
      e.classList.remove('open', 'show', 'match');
    });
    checkCards = [];
    startGame();
  }

  restart.addEventListener('click', function() {
    restartGame();
  });

  // when all is loaded run startGame
  document.addEventListener('DOMContentLoaded', startGame());


  // MODAL
  // Modal Code from w3schools
  const modal = document.getElementById('myModal');
  const btn = document.getElementById("myBtn");
  const span = document.querySelectorAll(".close")[0];
  const closeBtn = document.querySelectorAll(".close")[1];
  const restartBtn = document.querySelectorAll('.restart')[1];

  // when all the cards are matched show the congratulations modal
  function showModal() {
    if (checkCards.length === cards.length) {
      modal.style.display = "block";
    }
  }

  // When the user chooses to play again, close the modal and restart the Game
  restartBtn.addEventListener('click' , function() {
    console.log('clicked to restart.')
    modal.style.display = "none";
    restartGame();
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }
  // When the user clicks on the no button, close the modal
  closeBtn.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
