// #region Actions
export const CHANGE_PLAYER_BALANCE = 'CHANGE_PLAYER_BALANCE';
export const RAISE = 'RAISE';
export const PLAYER_BALANCE_CHANGED_SUCCESSFULLY = 'PLAYER_BALANCE_CHANGED_SUCCESSFULLY';
export const FOLD = 'FOLD';
export const CALL = 'CALL';
export const ON_PLAYER_RAISE = 'ON_PLAYER_RAISE';
export const PLAYER_WINS = 'PLAYER_WINS';
export const NPC_WINS = 'NPC_WINS';
export const START_NEW_GAME = 'START_NEW_GAME';
export const CHANGE_CARDS = 'CHANGE_CARDS';
export const RECEIVE_RAISE_INFO = 'RECEIVE_RAISE_INFO';
export const GET_CARD_INFO_FROM_CHILD = 'GET_CARD_INFO_FROM_CHILD';

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
});

export const onPlayerRaise = (payload) => ({
  type: ON_PLAYER_RAISE,
  payload
});

export const startNewGame = () => ({
  type: START_NEW_GAME
});

// #endregion Action Creators