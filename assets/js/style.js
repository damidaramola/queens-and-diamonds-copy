//file paths of 4 card images used in the game
const cardObjectDefined = [{
    id: 1,
    imagePath: 'assets/images/king-of-clubs.PNG'
},
{
    id: 2,
    imagePath: 'assets/images/Ace-of-Spades.PNG'
},
{
    id: 3,
    imagePath: 'assets/images/joker-card.PNG'
},
{
    id: 4,
    imagePath: 'assets/images/Queen-ofDiamonds.PNG'
}
];

const queenId = 4;

//Back image of cards
const cardBackImgPath = 'assets/images/card-back-Blue.png';

let cards = [];
//reference to start game button in global const
const playGameButtonElem = document.getElementById('playGame');
const cardContainerElem = document.querySelector('.card-placement');

//causes grid of cards to collapse showing only card 1
const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-1";

const numCards = cardObjectDefined.length;

let cardPositions = [];

let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;


const currentGameStatusElem = document.querySelector('.current-status');
const scoreContainerElem = document.querySelector('.header-score-container');
const scoreElem = document.querySelector('.score');
const roundContainerElem = document.querySelector('.header-round-container');
const roundElem = document.querySelector('.round');

const winColor = "green";
const loseColor = "red";
const primaryColor = "black";

let roundNum = 0;
let maxRounds = 4;
let score = 0;

let gameObj = {};

const localStorageGameKey = "HTA";

//Method called when game is first launched
loadGame();

function gameOver() {
updateStatusElement(scoreContainerElem, "none");
updateStatusElement(roundContainerElem, "none");
const gameOverMessage = `Game Over! Final Score - <span class = 'badge'>${score}</span> Click 'Play Game' button to start again`;
updateStatusElement(currentGameStatusElem, "block", primaryColor, gameOverMessage);

gameInProgress = false;
playGameButtonElem.disabled = false;
}


function endRound() {
setTimeout(() => {
    if (roundNum == maxRounds) {
        gameOver();
        return;
    } else {
        startRound();
    }
}, 3000);
}

function chooseCard(card) {
if (canChooseCard()) {
    evaluateCardChoice(card);

    saveGameObjectToLocalStorage(score, roundNum);
    flipCard(card, false);

    setTimeout(() => {
        flipCards(false);
        updateStatusElement(currentGameStatusElem, "block", primaryColor, "Card positions revealed");

        endRound();

    }, 3000);
    cardsRevealed = true;
}
}

//Calulates score after each round
function calculateScoreToAdd(roundNum) {
if (roundNum == 1) {
    return 100;
} else if (roundNum == 2) {
    return 50;
} else if (roundNum == 3) {
    return 25;
} else {
    return 10;
}
}


function calculateScore() {
const scoreToAdd = calculateScoreToAdd(roundNum);
score = score + scoreToAdd;
}

function updateScore() {
calculateScore();
updateStatusElement(scoreElem, "block", primaryColor, `Score <span class='badge'>${score}</span>`);

}

function updateStatusElement(elem, display, color, innerHTML) {
elem.style.display = display;
if (arguments.length > 2) {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
}
}

function outputChoiceFeedBack(hit) {
if (hit) {
    updateStatusElement(currentGameStatusElem, "block", winColor, "Correct! Nice Guess!");
} else {
    updateStatusElement(currentGameStatusElem, "block", loseColor, "Wrong..Hard luck!");
}
}

function evaluateCardChoice(card) {
if (card.id == queenId) {
    updateScore();
    outputChoiceFeedBack(true);
} else {
    outputChoiceFeedBack(false);
}
}

//cards can only be chosen after shuffling takes place
function canChooseCard() {
return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function loadGame() {
createCards();
cards = document.querySelectorAll('.card');
cardFlyInEffect();
playGameButtonElem.addEventListener('click', () => startGame());
updateStatusElement(scoreContainerElem, "none");
updateStatusElement(roundContainerElem, "none");
}


//If game is left unfinished, notification will allow player to continue
function checkForIncompleteGame() {
const serializedGameObj = getLocalStorageItemValue(localStorageGameKey);
if (serializedGameObj) {
    gameObj = getObjectFromJSON(serializedGameObj);
    if (gameObj.round >= maxRounds) {
        removeLocalStorageItem(localStorageGameKey);
    } else {
        if (confirm('Would you like to continue with your last game?')) {
            score = gameObj.score;
            roundNum = gameObj.round;
        }
    }
}
}

//Called when user clicks start game button
function startGame() {
initializeNewGame();
startRound();
}

//initializes new game
function initializeNewGame() {
score = 0;
roundNum = 0;

checkForIncompleteGame();

shufflingInProgress = false;
updateStatusElement(scoreContainerElem, "flex");
updateStatusElement(roundContainerElem, "flex");

updateStatusElement(scoreElem, "block", primaryColor, `Score <span class='badge'>${score}</span>`);
updateStatusElement(roundElem, "block", primaryColor, `Round <span class='badge'>${roundNum}</span>`);
}
//called when new round is started
function startRound() {
initializeNewRound();
collectCards();
flipCards(true);
shuffleCards();
}

//initializes new round
function initializeNewRound() {
roundNum++;
playGameButtonElem.disabled = true;

gameInProgress = true;
shufflingInProgress = true;
cardsRevealed = false;

updateStatusElement(currentGameStatusElem, "block", primaryColor, "Shuffling..");
updateStatusElement(roundElem, "block", primaryColor, `Round <span class='badge'>${roundNum}</span>`);
}

//stack cards ontop of one card which is visible
function collectCards() {
transformGridArea(collapsedGridAreaTemplate);
addCardsToGridAreaCell(cardCollectionCellClass);

}

function transformGridArea(areas) {
cardContainerElem.style.gridTemplateAreas = areas;
}

function addCardsToGridAreaCell(cellPositionClassName)
{
const cellPositionElem = document.querySelector(cellPositionClassName);

cards.forEach((card, index) =>{
    addChildElement(cellPositionElem, card);
});

}

// flips cards once card is chosen
function flipCard(card, flipToBack) {
const innerCardElem = card.firstChild;
if (flipToBack && !innerCardElem.classList.contains('flip-it')) {
    innerCardElem.classList.add('flip-it');
} else if (innerCardElem.classList.contains('flip-it')) {
    innerCardElem.classList.remove('flip-it');
}
}


function flipCards(flipToBack){
cards.forEach((card,index)=>{
    setTimeout(() => {
        flipCard(card,flipToBack);
    },index * 100);
});
}

//Allow cards to fly in once page loads
function cardFlyInEffect() {
const id = setInterval(flyIn, 3);
let cardCount = 0;
let count = 0;

function flyIn() {
    count++;
    if (cardCount == numCards) {
        clearInterval(id);
    }
    if (count == 1 || count == 250 || count == 500 || count == 750) {
        cardCount++;
        let card = document.getElementById(cardCount);
        card.classList.remove("fly-in");
    }
}
}

function removeShuffleClasses() {
cards.forEach((card) => {
    card.classList.remove("shuffle-left");
    card.classList.remove("shuffle-right");
});
}

//Allows shuffle of cards to be animated
function animateShuffle(shuffleCount) {
const random1 = Math.floor(Math.random() * numCards) + 1;
const random2 = Math.floor(Math.random() * numCards) + 1;

let card1 = document.getElementById(random1);
let card2 = document.getElementById(random2);

if (shuffleCount % 4 == 0) {

    card1.classList.toggle("shuffle-left");
    card1.style.zIndex = 100;
}
if (shuffleCount % 10 == 0) {

    card2.classList.toggle("shuffle-right");
    card2.style.zIndex = 200;
}
}

//shuffle cards for 2 seconds
function shuffleCards() {
let shuffleCount = 0;
const id = setInterval(shuffle, 2);

//randomize position of cards when shuffled
function shuffle() {

    randomizeCardPositions();
    animateShuffle(shuffleCount);
    if (shuffleCount == 500) {
        clearInterval(id);
        shufflingInProgress = false;
        removeShuffleClasses();
        dealCards();
        updateStatusElement(currentGameStatusElem, "block", primaryColor, "Please click the card that you think is the Queen of Diamonds..");
    } else {
        shuffleCount++;
    }
}

}

function createCards() {
cardObjectDefined.forEach((cardItem) => {
    createCard(cardItem);
});
}

function randomizeCardPositions() {
const random1 = Math.floor(Math.random() * numCards) + 1;
const random2 = Math.floor(Math.random() * numCards) + 1;

const temp = cardPositions[random1 - 1];
cardPositions[random1 - 1] = cardPositions[random2 - 1];
cardPositions[random2 - 1] = temp;

}

//Restores Grid to 4 grid cells after cards are shuffled
function dealCards() {
addCardsToAppropriateCell();
const areasTemplate = returnGridAreasMappedToCardPos();
transformGridArea(areasTemplate);
}

//Generates new positions for cards after shuffling
function returnGridAreasMappedToCardPos()
{
let firstPart = "";
let secondPart = "";
let areas = "";

cards.forEach((card, index) => {
    if(cardPositions[index] == 1)
    {
        areas = areas + "a ";
    }
    else if(cardPositions[index] == 2)
    {
        areas = areas + "b ";
    }
    else if (cardPositions[index] == 3)
    {
        areas = areas + "c ";
    }
    else if (cardPositions[index] == 4)
    {
        areas = areas + "d ";
    }
    if (index == 1)
    {
        firstPart = areas.substring(0, areas.length - 1);
        areas = "";
    }
    else if (index == 3)
    {
        secondPart = areas.substring(0, areas.length - 1);
    }

});

return `"${firstPart}" "${secondPart}"`;


}

function addCardsToAppropriateCell() {
cards.forEach((card) => {
    addCardToGridCell(card);
});
}

//This function is responsible for creating cards dynamically
function createCard(cardItem) {

//Div Elements that make up a card 
const cardElem = createElement('div');
const cardInnerElem = createElement('div');
const cardFrontElem = createElement('div');
const cardBackElem = createElement('div');

//create front and back image elements for cards 
const cardFrontImg = createElement('img');
const cardBackImg = createElement('img');

//add class and id to card element
addClassToElement(cardElem, 'card');
addClassToElement(cardElem, 'fly-in');
addIdToElement(cardElem, cardItem.id);

//add class to inner card element 
addClassToElement(cardInnerElem, 'card-inner');

//add class to front card element
addClassToElement(cardFrontElem, 'card-front');

//add class to front card element
addClassToElement(cardBackElem, 'card-back');

//add src attribute and appropriate vlaues to img element of back of card 
addSrcToImageElem(cardBackImg, cardBackImgPath);

//add src attribute and appropriate vlaues to img element of front of card 
addSrcToImageElem(cardFrontImg, cardItem.imagePath);

//assign class to back Image element *bug fixed
addClassToElement(cardBackImg, 'card-img');

//assign class to front Image element *bug fixed
addClassToElement(cardFrontImg, 'card-img');

//add front element as child  element to front card element 
addChildElement(cardFrontElem, cardFrontImg);

//add back element as child  element to back card element 
addChildElement(cardBackElem, cardBackImg);

//add front element as child  element to front inner element 
addChildElement(cardInnerElem, cardFrontElem);

//add back element as child  element to back inner element 
addChildElement(cardInnerElem, cardBackElem);

//add inner card element as child element to card element 
addChildElement(cardElem, cardInnerElem);

//add card element as child element to appropriate grid cell
addCardToGridCell(cardElem);

initializeCardPositions(cardElem);

attachClickEventHandlerToCard(cardElem);

}

function attachClickEventHandlerToCard(card) {
card.addEventListener('click', () => chooseCard(card));
}

function initializeCardPositions(card) {
cardPositions.push(card.id);
}

//This function creates html elements
function createElement(elemType) {
return document.createElement(elemType);
}

//This function adds a class to the html element
function addClassToElement(elem, className) {
elem.classList.add(className);
}
//Gives Element a unique id
function addIdToElement(elem, id) {
elem.id = id;
}

//Assigns a path for the relevant image to src attribute of img element
function addSrcToImageElem(imgElem, src) {
imgElem.src = src;
}

//assigns child elements to their parent elements
function addChildElement(parentElem, childElem) {
parentElem.appendChild(childElem);
}

//adds the card to the appropriate Grid Cell
function addCardToGridCell(card) {
const cardPositionClassName = mapCardIdToGridCell(card);
const cardPosElem = document.querySelector(cardPositionClassName);

addChildElement(cardPosElem, card);

}

function mapCardIdToGridCell(card) {
if (card.id == 1) {
    return '.card-1';
} else if (card.id == 2) {
    return '.card-2';
} else if (card.id == 3) {
    return '.card-3';
} else if (card.id == 4) {
    return '.card-4';
}
}

//local storage functions

function getSerializedObjectAsJSON(obj) {
return JSON.stringify(obj);
}

function getObjectFromJSON(json) {
return JSON.parse(json);
}

function updateLocalStorageItem(key, value) {
localStorage.setItem(key, value);
}

function removeLocalStorageItem(key) {
localStorage.removeItem(key);
}

function getLocalStorageItemValue(key) {
return localStorage.getItem(key);
}

function updateGameObject(score, round) {
gameObj.score = score;
gameObj.round = round;
}

function saveGameObjectToLocalStorage(score, round) {
updateGameObject(score, round);
updateLocalStorageItem(localStorageGameKey, getSerializedObjectAsJSON(gameObj));
}

