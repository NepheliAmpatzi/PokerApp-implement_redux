const {
  CheckTheHand,
} = require('../handevaluation.js');

const {
  Card,
  Suit,
  EvaluationResult,
  getNumberCardArrayFromCardSuitSets
} = require('./handEvaluation.testHelper');


describe('CheckTheHand should return the expected values', () => {

  // #region Royal Flush

  it('should return flush royal (Hearts in order)', () => {
    const royalFlushCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Ace, suit: Suit._Hearts },
      { card: Card._King, suit: Suit._Hearts },
      { card: Card._Queen, suit: Suit._Hearts },
      { card: Card._Jack, suit: Suit._Hearts },
      { card: Card._Ten, suit: Suit._Hearts },
    )

    expect(CheckTheHand(royalFlushCardSet)).toEqual(EvaluationResult._Royal_Flush);
  });

  it('should return flush royal (Hearts mixed)', () => {
    const royalFlushCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Queen, suit: Suit._Hearts },
      { card: Card._King, suit: Suit._Hearts },
      { card: Card._Ten, suit: Suit._Hearts },
      { card: Card._Jack, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Hearts },
    )

    expect(CheckTheHand(royalFlushCardSet)).toEqual(EvaluationResult._Royal_Flush);
  });

  // #endregion Royal Flush

  // #region Straight Flush
  it('should return straight Flush (Hearts mixed)', () => {
    const royalFlushCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Queen, suit: Suit._Hearts },
      { card: Card._King, suit: Suit._Hearts },
      { card: Card._Ten, suit: Suit._Hearts },
      { card: Card._Jack, suit: Suit._Hearts },
      { card: Card._Nine, suit: Suit._Hearts },
    )

    expect(CheckTheHand(royalFlushCardSet)).toEqual(EvaluationResult._Straight_Flush)
  });

  it('should return straight Flush (Clubs mixed, may cause false positive on Flush Royal, hope not!)', () => {
    const straightFlushCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Ace, suit: Suit._Clubs },
      { card: Card._Two, suit: Suit._Clubs },
      { card: Card._Three, suit: Suit._Clubs },
      { card: Card._Four, suit: Suit._Clubs },
      { card: Card._Five, suit: Suit._Clubs },
    )

    expect(CheckTheHand(straightFlushCardSet)).toEqual(EvaluationResult._Straight_Flush)
  });

  // #endregion Straight Flush

  // #region Four of A Kind
  it('should return four of a kind (ace test)', () => {
    const fourOfAKindCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Ace, suit: Suit._Clubs },
      { card: Card._Ace, suit: Suit._Diamonds },
      { card: Card._Ace, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Spades },
      { card: Card._Five, suit: Suit._Clubs },
    )

    expect(CheckTheHand(fourOfAKindCardSet)).toEqual(EvaluationResult._Four_of_a_kind)
  });

  it('should return four of a kind (king test)', () => {
    const fourOfAKindCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._King, suit: Suit._Clubs },
      { card: Card._King, suit: Suit._Diamonds },
      { card: Card._King, suit: Suit._Hearts },
      { card: Card._King, suit: Suit._Spades },
      { card: Card._Ace, suit: Suit._Clubs },
    )

    expect(CheckTheHand(fourOfAKindCardSet)).toEqual(EvaluationResult._Four_of_a_kind)
  });

  it('should return four of a kind (five test)', () => {
    const fourOfAKindCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Five, suit: Suit._Clubs },
      { card: Card._Five, suit: Suit._Diamonds },
      { card: Card._Five, suit: Suit._Hearts },
      { card: Card._Five, suit: Suit._Spades },
      { card: Card._Queen, suit: Suit._Spades },
    )

    expect(CheckTheHand(fourOfAKindCardSet)).toEqual(EvaluationResult._Four_of_a_kind)
  });

  // #endregion Four of A Kind

  // #region Full House
  it('should return full house (fives and threes test)', () => {
    const fullHouseCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Five, suit: Suit._Clubs },
      { card: Card._Five, suit: Suit._Diamonds },
      { card: Card._Five, suit: Suit._Hearts },
      { card: Card._Three, suit: Suit._Clubs },
      { card: Card._Three, suit: Suit._Spades },
    )

    expect(CheckTheHand(fullHouseCardSet)).toEqual(EvaluationResult._Full_House);
  });

  it('should return full house (kings and aces test)', () => {
    const fullHouseCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Ace, suit: Suit._Clubs },
      { card: Card._Ace, suit: Suit._Diamonds },
      { card: Card._Ace, suit: Suit._Hearts },
      { card: Card._King, suit: Suit._Clubs },
      { card: Card._King, suit: Suit._Spades },
    )

    expect(CheckTheHand(fullHouseCardSet)).toEqual(EvaluationResult._Full_House);
  });


  // #endregion Full House

  // #region Flush
  it('should return flush (hearts)', () => {
    const flushCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Three, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Hearts },
      { card: Card._Seven, suit: Suit._Hearts },
      { card: Card._Queen, suit: Suit._Hearts },
      { card: Card._King, suit: Suit._Hearts },
    )

    expect(CheckTheHand(flushCardSet)).toEqual(EvaluationResult._Flush);
  });

  it('should return flush (diamonds)', () => {
    const flushCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Three, suit: Suit._Diamonds },
      { card: Card._Jack, suit: Suit._Diamonds },
      { card: Card._Two, suit: Suit._Diamonds },
      { card: Card._Queen, suit: Suit._Diamonds },
      { card: Card._King, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(flushCardSet)).toEqual(EvaluationResult._Flush);
  });

  // #endregion Flush

  // #region Straight
  it('should return straight (Almost Royal Flush)', () => {
    const straightCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Ten, suit: Suit._Diamonds },
      { card: Card._Jack, suit: Suit._Diamonds },
      { card: Card._Ace, suit: Suit._Clubs },
      { card: Card._Queen, suit: Suit._Diamonds },
      { card: Card._King, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(straightCardSet)).toEqual(EvaluationResult._Straight);
  });

  it('should return straight (2 - 6)', () => {
    const straightCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Three, suit: Suit._Diamonds },
      { card: Card._Four, suit: Suit._Clubs },
      { card: Card._Two, suit: Suit._Spades },
      { card: Card._Five, suit: Suit._Hearts },
      { card: Card._Six, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(straightCardSet)).toEqual(EvaluationResult._Straight);
  });

  it('should return straight (1 - 5)', () => {
    const straightCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Three, suit: Suit._Diamonds },
      { card: Card._Four, suit: Suit._Clubs },
      { card: Card._Two, suit: Suit._Spades },
      { card: Card._Five, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(straightCardSet)).toEqual(EvaluationResult._Straight);
  });
  // #endregion Straight

  // #region Three of A Kind
  it('should return threeOfAKind (8s)', () => {
    const threeOfAKindCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Eight, suit: Suit._Diamonds },
      { card: Card._Eight, suit: Suit._Clubs },
      { card: Card._Eight, suit: Suit._Spades },
      { card: Card._Five, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(threeOfAKindCardSet)).toEqual(EvaluationResult._Three_of_a_kind);
  });

  it('should return threeOfAKind (aces)', () => {
    const threeOfAKindCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Three, suit: Suit._Diamonds },
      { card: Card._Four, suit: Suit._Clubs },
      { card: Card._Ace, suit: Suit._Spades },
      { card: Card._Ace, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(threeOfAKindCardSet)).toEqual(EvaluationResult._Three_of_a_kind);
  });

  it('should return threeOfAKind (Kings)', () => {
    const threeOfAKindCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._King, suit: Suit._Diamonds },
      { card: Card._King, suit: Suit._Clubs },
      { card: Card._King, suit: Suit._Spades },
      { card: Card._Five, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(threeOfAKindCardSet)).toEqual(EvaluationResult._Three_of_a_kind);
  });
  // #endregion Three of A Kind

  // #region Two Pairs
  it('should return twoPairs (Kings Aces)', () => {
    const twoPairsCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._King, suit: Suit._Diamonds },
      { card: Card._King, suit: Suit._Clubs },
      { card: Card._Ace, suit: Suit._Spades },
      { card: Card._Five, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(twoPairsCardSet)).toEqual(EvaluationResult._Two_Pairs);
  });

  it('should return twoPairs (Ones Twos)', () => {
    const twoPairsCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._King, suit: Suit._Diamonds },
      { card: Card._Two, suit: Suit._Clubs },
      { card: Card._Two, suit: Suit._Spades },
      { card: Card._Ace, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(twoPairsCardSet)).toEqual(EvaluationResult._Two_Pairs);
  });


  // #endregion Two Pairs

  // #region One Pair
  it('should return onePair (Aces with king...)', () => {
    const onePairCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._King, suit: Suit._Diamonds },
      { card: Card._Queen, suit: Suit._Clubs },
      { card: Card._Jack, suit: Suit._Spades },
      { card: Card._Ace, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(onePairCardSet)).toEqual(EvaluationResult._One_Pair);
  });

  it('should return onePair (Kings with ace...)', () => {
    const onePairCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._King, suit: Suit._Diamonds },
      { card: Card._King, suit: Suit._Clubs },
      { card: Card._Queen, suit: Suit._Spades },
      { card: Card._Jack, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(onePairCardSet)).toEqual(EvaluationResult._One_Pair);
  });

  it('should return onePair (Aces with two...)', () => {
    const onePairCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Four, suit: Suit._Diamonds },
      { card: Card._Three, suit: Suit._Clubs },
      { card: Card._Two, suit: Suit._Spades },
      { card: Card._Ace, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(onePairCardSet)).toEqual(EvaluationResult._One_Pair);
  });
  // #endregion One Pair

  // #region High Card
  it('should return high Card (Ace)', () => {
    const highCardCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Four, suit: Suit._Diamonds },
      { card: Card._Three, suit: Suit._Clubs },
      { card: Card._Two, suit: Suit._Spades },
      { card: Card._Ten, suit: Suit._Hearts },
      { card: Card._Ace, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(highCardCardSet)).toEqual(EvaluationResult._High_Card);
  });

  it('should return highCard (10)', () => {
    const highCardCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Four, suit: Suit._Diamonds },
      { card: Card._Three, suit: Suit._Clubs },
      { card: Card._Two, suit: Suit._Spades },
      { card: Card._Ten, suit: Suit._Hearts },
      { card: Card._Nine, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(highCardCardSet)).toEqual(EvaluationResult._High_Card);
  });

  it('should return highCard (King)', () => {
    const highCardCardSet = getNumberCardArrayFromCardSuitSets(
      { card: Card._Four, suit: Suit._Diamonds },
      { card: Card._Three, suit: Suit._Clubs },
      { card: Card._Two, suit: Suit._Spades },
      { card: Card._King, suit: Suit._Hearts },
      { card: Card._Six, suit: Suit._Diamonds },
    )

    expect(CheckTheHand(highCardCardSet)).toEqual(EvaluationResult._High_Card);
  });
  // #endregion High Card

});