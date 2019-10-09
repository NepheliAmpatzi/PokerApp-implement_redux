import handEvaluation from './handEvaluation'

<<<<<<< HEAD
function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  const list = []
  list.push(Math.floor(Math.random() * (max - min + 1)) + min)
  return list
}

function generateDeck () {
  const deck = []
  handevaluation.suits.forEach(suit => {
    handevaluation.ranks.forEach(rank => {
      deck.push(Number(rank.code.toString() + suit.code.toString()))
    })
  })
  return deck
=======
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const list = [];
    list.push(Math.floor(Math.random() * (max - min + 1)) + min);
    return list;
}

function generateDeck(){
    const deck = [];
    handEvaluation.suits.forEach(suit => {
        handEvaluation.ranks.forEach(rank =>{
            deck.push(Number(rank.code.toString()+suit.code.toString()));
        });
    });
    return deck;
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
}

function shuffleDeck (deck) {
  const shuffledDeck = []
  while (shuffledDeck.length < deck.length) {
    const cardIndex = getRandomInt(0, deck.length - 1)
    if (!shuffledDeck.includes(deck[cardIndex])) {
      shuffledDeck.push(deck[cardIndex])
    }
  }
  return shuffledDeck
}

<<<<<<< HEAD
export function drawCards (shuffledDeck, num) {
  return shuffledDeck.splice(0, num)
}

function compareTwoHands (player, npc) {
  if (player > npc) {
    alert('You Win!!!')
    return 100
  }
  if (player < npc) {
    alert('You lose :(')
    return 0
  }
  if (player === npc) {
    alert('Tie!')
    return 50
  }
}

export default {
  getRandomInt,
  shuffleDeck,
  generateDeck,
  drawCards,
  compareTwoHands
}
=======
function drawCards(shuffledDeck, num){
    return shuffledDeck.splice(0, num);
}

function compareTwoHands(player, npc){
    if(player > npc){
        alert('You Win!!!');
        return 100;
    }
    if(player < npc){
        alert('You lose :(');
        return 0;
    }
    if(player === npc){
        alert('Tie!');
        return 50;
    }
}

export {
    getRandomInt,
    shuffleDeck,
    generateDeck,
    drawCards,
    compareTwoHands
};
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
