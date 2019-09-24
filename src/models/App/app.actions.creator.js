// #region Actions
export const CHANGE_PLAYER_BALANCE = 'CHANGE_PLAYER_BALANCE';
export const RAISE = 'RAISE';
export const PLAYER_BALANCE_CHANGED_SUCCESSFULLY = 'PLAYER_BALANCE_CHANGED_SUCCESSFULLY';
export const FOLD = 'FOLD';
export const CALL = 'CALL';
export const PLAYER_WINS = 'PLAYER_WINS';
export const NPC_WINS = 'NPC_WINS';
export const START_NEW_GAME = 'START_NEW_GAME';
export const CHANGE_CARDS = 'CHANGE_CARDS';
export const RECEIVE_RAISE_INFO = 'RECEIVE_RAISE_INFO';
export const GET_CARD_INFO_FROM_CHILD = 'GET_CARD_INFO_FROM_CHILD';

// playerHand: createDeck.drawCards(deck, 5),
//       npcHand: createDeck.drawCards(deck, 5),
//       deck: deck,
//       indexOccurencies: {},
//       uniqueselectedCards: [],
//       raiseAmount: '',
//       npcBet: '',
//       playerBet: '',
//       totalBet: '',
//       disableBtn: true,
//       currentNpcBalance: 1000,
//       currentPlayerBalance: 1000,
//       playerWins: false,
//       npcWins: false,
//       tie: false,
//       cardInfo: {
//         cardCode: null,
//         selected: false

// this.getCardInfoFromChild = this.getCardInfoFromChild.bind(this);
//     this.onRaise = this.onRaise.bind(this);
//     this.onCall = this.onCall.bind(this);
//     this.onFold = this.onFold.bind(this);
//     this.startNewGame = this.startNewGame.bind(this);
//     this.changeCards = this.changeCards.bind(this);
//     this.receiveRaiseInfo = this.receiveRaiseInfo.bind(this);

// #endregion Actions

// #region Action Creators

/**
 * @param {number} payload is the amount difference that will be applied to the payload
 */
export const changePlayerBalance = (payload) => ({
  type: CHANGE_PLAYER_BALANCE,
  payload,
});

/**
 * @param {number} payload is the amount of raise
 */
export const onRaise = (payload) => ({
  type: RAISE,
  payload,
});

export const onFold = () => ({
  type: FOLD
});

export const onCall = (payload) => ({
  type: CALL,
  payload
})

// #endregion Action Creators