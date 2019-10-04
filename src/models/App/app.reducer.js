import { getEvaluationResult } from '../../utils/handEvaluation';
import { 
  drawCards,
  shuffleDeck,
  generateDeck,
  compareTwoHands, 
} from '../../utils/createDeck';

import {
  CHANGE_PLAYER_BALANCE,
  RAISE,
  FOLD,
  CALL,
  ON_PLAYER_RAISE,
  START_NEW_GAME
} from './app.actions.creator';

import {
  getPlayerBalance, getNpcBalance, getRaiseAmount
} from './app.stateSelectors';

const deck = shuffleDeck(generateDeck());

export const initialState = {
  app: {
    playerHand: drawCards(shuffleDeck(deck), 5),
    npcHand: drawCards(shuffleDeck(deck), 5),
    deck: deck,
    indexOccurencies: {},
    uniqueSelectedCards: [],
    raiseAmount: 10,
    npcBet: 0,
    playerBet: 0,
    totalBet: 0,
    disableBtn: true,
    currentNpcBalance: 1000,
    currentPlayerBalance: 1000,
    playerWins: false,
    npcWins: false,
    tie: false,
    cardInfo: {
      cardCode: null,
      selected: false
    }
  }
};

/**
 * A function that receives an action and changes the state
 * @param {*} state the state that will be transformed byt the reducer
 * @param {*} action the action that is responsible for the state change
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case (CHANGE_PLAYER_BALANCE): {
      const playerBalance = getPlayerBalance(state);
      const currentPlayerBalance = playerBalance + action.payload;
      return {
        ...state,
        currentPlayerBalance,
      };
    }
    case (START_NEW_GAME): {
      return{
        ...state,
          playerHand: drawCards(shuffleDeck(deck), 5),
          npcHand: drawCards(shuffleDeck(deck), 5),
          disableBtn: true,
          indexOccurencies: {},
          uniqueselectedCards: [],
          npcBet: '',
          playerBet: '',
          totalBet: '',
          playerWins: false,
          npcWins: false,
          tie: false,
          cardInfo: {
            cardCode: null,
            selected: false
          }
      }
    }
    case (RAISE): {
      const currentPlayerBalance = getPlayerBalance(state) - getRaiseAmount(state);
      return {
        ...state,
        raiseAmount: getRaiseAmount(state),
        currentPlayerBalance,
      };
    }
    case (FOLD): {
      return {
        ...state,
        disableBtn: true,
        npcWins: true
      };
    }
    case (CALL): {
      let result = compareTwoHands(getEvaluationResult(state.playerHand), getEvaluationResult(state.npcHand)); 
      if (result === 100){
        return {
          ...state,
          playerWins: true,
          currentPlayerBalance: state.currentPlayerBalance + state.playerBet + state.npcBet
        };
      }
      else if (result === 0){
        return {
          ...state,
          npcWins: true,
          currentNpcBalance: state.currentNpcBalance + state.playerBet + state.npcBet
        };
      }
      else {
        return {
          ...state
        };
      }
    }
    case (ON_PLAYER_RAISE): {
      const currentNpcBalance = getNpcBalance(state);
      const currentPlayerBalance = getPlayerBalance(state);
      const amountRaised = getRaiseAmount(state)
      console.log(currentNpcBalance, currentPlayerBalance, amountRaised)
    }
    default: {
      return state;
    }
  }
}