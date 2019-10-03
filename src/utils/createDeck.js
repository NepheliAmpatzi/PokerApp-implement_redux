import handEvaluation from './handEvaluation'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const list = [];
    list.push(Math.floor(Math.random() * (max - min + 1)) + min)
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
}

function shuffleDeck(deck){
    const shuffledDeck = [];
    while(shuffledDeck.length < deck.length){
       const cardIndex = getRandomInt(0, deck.length-1);
       if(!shuffledDeck.includes(deck[cardIndex])){
           shuffledDeck.push(deck[cardIndex]);
       } 
    }
    return shuffledDeck;
}

function drawCards(shuffledDeck, num){
    return shuffledDeck.splice(0, num);
}

function compareTwoHands(player, npc){
    if(player > npc){
        alert("You Win!!!");
        return 100;
    }
    if(player < npc){
        alert("You lose :(");
        return 0;
    }
    if(player === npc){
        alert("Tie!");
        return 50;
    }
}

export {
    getRandomInt,
    shuffleDeck,
    generateDeck,
    drawCards,
    compareTwoHands
}