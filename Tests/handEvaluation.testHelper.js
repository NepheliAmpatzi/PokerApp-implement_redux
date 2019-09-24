const Suit = {
  _Hearts : 1,
  _Diamonds : 2,
  _Clubs : 3,
  _Spades : 4,
}

const Card = {
  _Ace : 14,
  _Two : 2,
  _Three : 3,
  _Four : 4,
  _Five : 5,
  _Six : 6,
  _Seven : 7,
  _Eight : 8,
  _Nine : 9,
  _Ten : 10,
  _Jack : 11,
  _Queen : 12,
  _King : 13,
}

const EvaluationResult = {
  _Royal_Flush : 1000,
  _Straight_Flush : 900,
  _Four_of_a_kind : 800,
  _Full_House : 700,
  _Flush : 600,
  _Straight : 500,
  _Three_of_a_kind : 400,
  _Two_Pairs : 300,
  _One_Pair : 200,
  _High_Card : 100,
}

/**
 * Returns card code from Card, Suit combination
 * @param {Card} Card
 * @param {Suit} Suit
 * @returns {number}
 */
const getCodeFromCardSuitType = (card, suit) => (card.toString() + suit.toString());

/**
 * Gets Card Suit sets array and returns array of numbers that represent card codes
 * @param  {...{Card, Suit}} set
 * @returns {number[]}
 */
const getNumberCardArrayFromCardSuitSets = (...set) => (
  set.map(({card, suit}) => getCodeFromCardSuitType(card, suit))
)

module.exports = {
  Suit,
  Card,
  EvaluationResult,
  getNumberCardArrayFromCardSuitSets,
}