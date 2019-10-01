
/**
 * @param {State} state
 * @returns {number} player balance by Value, because it's a primitive
 */
export const getPlayerBalance = (state) => state.currentPlayerBalance;

/**
 * @param {State} state
 * @returns {number} player balance by Value, because it's a primitive
 */
export const getNpcBalance = (state) => state.currentNpcBalance;

export const getPlayerBet = (state) => state.playerBet;

export const getNpcBet = (state) => state.npcBet;

export const getRaiseAmount = (state) => state.raiseAmount;
/**
 * @param {State} state
 * @returns {number[]} a new shallow copy of player hand because array is an object.
 * Without spreading this would cause a reference return, which would lead to am mutation and its side effects
 */
export const getPlayerHand = (state) => [...state.playerHand];

/**
 * @param {State} state
 * @returns {number[]} a new shallow copy of player hand because array is an object.
 * Without spreading this would cause a reference return, which would lead to am mutation and its side effects
 */
export const getNpcHand = (state) => [...state.npcHand];