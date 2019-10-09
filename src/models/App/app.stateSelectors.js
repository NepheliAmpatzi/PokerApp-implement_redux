/**
 * @param {State} state
 * @returns {number} player balance by Value, because it's a primitive
 */
<<<<<<< HEAD
export const getPlayerBalance = (state) => state.currentPlayerBalance
=======
export const getPlayerBalance = state => state.currentPlayerBalance;
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63

/**
 * @param {State} state
 * @returns {number} player balance by Value, because it's a primitive
 */
<<<<<<< HEAD
export const getNpcBalance = (state) => state.currentNpcBalance

export const getPlayerBet = (state) => state.playerBet

export const getNpcBet = (state) => state.npcBet

export const getRaiseAmount = (state) => state.raiseAmount
=======
export const getNpcBalance = state => state.currentNpcBalance;

/**
 * @param {State} state
 * @returns {number} player balance by Value, because it's a primitive
 */
export const getPlayerBet = (state) => state.playerBet;
export const getNpcBet = (state) => state.npcBet;
export const getTotalBet = (state) => state.totalBet;
export const getRaiseAmount = (state) => state.raiseAmount;

>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
/**
 * @param {State} state
 * @returns {number[]} a new shallow copy of player hand because array is an object.
 * Without spreading this would cause a reference return, which would lead to a mutation and its side effects
 */
<<<<<<< HEAD
export const getPlayerHand = (state) => [...state.playerHand]
=======
export const getPlayerHand = state => [...state.playerHand];
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63

/**
 * @param {State} state
 * @returns {number[]} a new shallow copy of player hand because array is an object.
 * Without spreading this would cause a reference return, which would lead to a mutation and its side effects
 */
<<<<<<< HEAD
export const getNpcHand = (state) => [...state.npcHand]
=======
export const getNpcHand = state => [...state.npcHand];
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
