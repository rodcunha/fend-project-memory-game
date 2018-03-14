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
  let counter = 1;
  let moveCounter = 1; // define a counter to count the number ov moves.
  let seconds = 0; // define the seconds variable
  const deck = document.querySelector('.deck');  // the unordered list that contains all the cards
  const tiles = document.querySelectorAll('.card'); // selects all the list items and adds them to the tiles variable
  const movesElem = document.querySelectorAll('.moves'); // selects the moves class span in the HTML
  const restart = document.querySelector('.fa-repeat'); // selects the restart icon
  // Modal variables for showModal()
  const modal = document.getElementById('myModal'); //myModal Element
  const btn = document.getElementById("myBtn"); //myBtn
  const closeBtn = document.querySelectorAll(".close")[1]; //second span with the class close
  const time = document.querySelector(".time"); // element with the class of time
  const restartBtn = document.querySelectorAll('.restart')[1]; // second element with the class .restart
  const span = document.querySelectorAll(".close")[0]; //first span with the class close
  //const selectDeck = document.querySelectorAll('.chooseDeck'); //selects all the buttons with chooseDeck class
  let cards, cardsTop, cardsBottom, stopTimer;
  let cardOne, cardTwo;


  //function to count the moves.
  var moves = deck.addEventListener('click', function() {
    movesElem.forEach(function(e) {
      e.innerHTML = moveCounter;
    });
  });

  //function to start the start the timer
  let timerRunning = false;
  let timer = document.querySelector('.timer');

  var startTimer = () => {
    seconds += 1;
    timer.innerText = seconds;
    clearInterval(startTimer);
  }

  // function to remove the stars from the score
  var starCount = () => {
    //console.log('moveCounter = ' + moveCounter);
    if (moveCounter === 15) { // when the move counter reaches 15 remove the star
      document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');
    } else if (moveCounter === 25) { // when the move counter reaches 25 remove the star
      document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');
    }
    // user always gets one star!
  }

  // function to set the score of stars
  var score = () => {
    let scoreElem = document.querySelector('#score'); // selects the element with the id of score
    const starList = document.querySelector('.stars'); //selects the element with the class of stars
    scoreElem.innerHTML = starList.innerHTML;
    // console.log(starList.innerHTML)
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
  var shuffleCards = () => {
    cardsTop = cardsPawPatrol.slice(0); //shuffle the first iteration of the cards
    cardsBottom = cardsPawPatrol.slice(0); //shuffle the second iteration of the cards
    cards = cardsTop.concat(cardsBottom); // join the two arrays
    shuffle(cards); // shuffle one last time the new array
  };

  //function to assign the images
  var assignImg = () => {
    for (i = 0 ; i < cards.length; i++) { //loop through all the cards
      tiles[i].children.item(0).setAttribute('src', cards[i].img); //select the child item and set the source randomly
      tiles[i].setAttribute('data-card', cards[i].card); //set the data-card attribute which we will after add to the new array
    }
  }

  var showCards = (e) => {
    const isTurned = e.target.getAttribute('data-clicked');  //is the card already turned
    const cardId = e.target.getAttribute('data-card');  // assign the id to a variable

    if ( e.target.nodeName === 'LI' && !isTurned ) {
      e.target.className += " open";
      setTimeout(function(){
        e.target.className += " show";
      }, 250);
    }

    if (isTurned === 'yes' || e.target.nodeName === 'IMG') {
      console.log('this is an image.')
    } else if (cardId != null && cardId != undefined) {
      checkCards.push(cardId);
      console.log(checkCards);
    }
    e.target.setAttribute('data-clicked', 'yes'); // set an attribute to see if the card has been turned
  }

  var foldCards = () => {
    cardTwo.className = 'card';
    cardOne.className = 'card';
  }

  // function  to assign the values to the cards
  //console.log('counter: ' + counter);
  var assignValues = (e) => {
      if (counter === 1 && !e.target.getAttribute('.show') && e.target != deck && e.target.nodeName === 'LI') {
        cardOne = e.target;
        counter++;
      } else if (counter === 2 && !e.target.getAttribute('.show') && e.target != deck && e.target.nodeName === 'LI') {
        cardTwo = e.target;
        counter = 1;
        starCount();
     }
  }

// function to match the cards
var matchCards = (e) => {
    if ( (checkCards.length %2) === 0 ) {
      const matchOne = checkCards[checkCards.length - 2]; // second to last card on the array
      const matchTwo = checkCards[checkCards.length-1]; // last card on the array
      const openCards = document.getElementsByClassName('open show'); // select elements with both classes open and show
    console.log('cardOne: ' + cardOne + " --- cardTwo: " + cardTwo );
    //check if the array is pair and if the cards match and if the target isn't deck
    if ( matchOne === matchTwo && e.target != deck ) {
      cardOne.className += " match"; //add class match to both variables
      cardTwo.className += " match";
      moveCounter++; //increment the counters
      console.log('The cards match');
    // check if the the array length is pair and if the cards don't match and the target wasn't the deck element
    } else if ( checkCards.length % 2 === 0 && matchOne != matchTwo && e.target != deck ) {
      console.log(cardOne + "-" + cardTwo + 'They are not a match');
      checkCards.splice(-2, 2); //remove the 2 cards from the array
      cardOne.removeAttribute('data-clicked'); //removes the clicked flag when the cards don't match
      cardTwo.removeAttribute('data-clicked'); //removes the clicked flag when the cards don't match

      setTimeout(foldCards, 400); //fold the cards
      moveCounter++; //increments the counter
    }
  } // end of main conditional
} // end of match cards

  // Modal Code from w3schools
  // when all the cards are matched show the congratulations modal
  var showModal = () => {
    if (checkCards.length === cards.length) {
      score(); //execute the score function
      clearInterval(stopTimer); //stop the timer
      modal.style.display = "block";  // show the modal (from hidden)
      time.innerText = seconds; // display the seconds elapsed on the modal
      //set the timer back to 0
      timer.innerText = 0;
    }
  }

  // When the user chooses to play again, close the modal and restart the Game
  restartBtn.addEventListener('click' , function(e) {
    modal.style.display = "none";
    restartGame(e);
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
      modal.style.display = "none";
  }
  // When the user clicks on the no button, close the modal
  closeBtn.onclick = () => {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // conditional to check if the function is already running, if so do not execute it again.
  var checkTimer = () => {
    if (timerRunning === false) {
      stopTimer = setInterval(startTimer, 1000);
      timerRunning = true; //timer is running
    }
  }


  deck.addEventListener('click',  function(e) {  //when the deck element is clicked
      console.log('timerRunning = ' + timerRunning)
      e.stopImmediatePropagation();
      e.preventDefault();

      console.log('timerRunning coditional: ' + timerRunning);
      checkTimer();
      showCards(e);
      assignValues(e);
      matchCards(e);
      showModal();
  });


  // startGame function
  var startGame = () => {
    shuffleCards();
    assignImg();
  }

  //function to restart the game
  var restartGame = () => {
    const stars = document.querySelectorAll('.fa'); // select all elements with the .fa class
    const cards = document.querySelectorAll('.card'); // select all elements with the .card class
    const clearCards = document.querySelectorAll('.show'); // select all the cards shown

    resetTimer();

    moveCounter = 1;
    movesElem[0].innerHTML = moveCounter;
    stars.forEach(function(e) {
      e.classList += ' fa-star';
    });
    clearCards.forEach(function(e) {
        e.classList.remove('open', 'show', 'match');
        e.removeAttribute('data-clicked');
    });
    checkCards = []; //reset the array used to check the values to an empty array
    setTimeout(function() { //delay for the reshuffle not to be visible
      startGame();
    }, 500);
  }

  //function to run when the game is rerstarted.
  restart.addEventListener('click', function(e) {
    restartGame(e);
  });

  // function to reset the timer counting
  var resetTimer = () => {
    clearInterval(stopTimer);
    seconds = 0; // reset seconds
    setTimeout(() => {timer.innerText = seconds;}, 150);
    timerRunning = false;
  }

  // when all is loaded run startGame
  document.addEventListener('DOMContentLoaded', startGame());
