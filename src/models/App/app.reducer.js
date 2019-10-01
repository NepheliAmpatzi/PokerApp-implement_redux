import handevaluation from '../../utils/handevaluation';
import createDeck from '../../utils/createDeck';

import {
  CHANGE_PLAYER_BALANCE,
  RAISE,
  FOLD,
  CALL
} from './app.actions.creator';

import {
  getPlayerBalance
} from './app.stateSelectors';


export const initialState = {
  app: {
    playerHand: createDeck.drawCards(createDeck.shuffleDeck(createDeck.generateDeck()), 5),
    npcHand: createDeck.drawCards(createDeck.shuffleDeck(createDeck.generateDeck()), 5),
    deck: [],
    indexOccurencies: {},
    uniqueselectedCards: [],
    raiseAmount: 0,
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
export default function (state = initialState, action) {
  switch (action.type) {
    case (CHANGE_PLAYER_BALANCE): {
      const playerBalance = getPlayerBalance(state);
      const currentPlayerBalance = playerBalance + action.payload;
      return {
        ...state,
        currentPlayerBalance,
      };
    }
    case (RAISE): {
      const amountRaised = action.payload;
      const playerBalance = getPlayerBalance(state);
      const currentPlayerBalance = playerBalance - amountRaised;
      return {
        ...state,
        raiseAmount: amountRaised,
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
      let result = createDeck.compareTwoHands(handevaluation.getEvaluationResult(state.playerHand), handevaluation.getEvaluationResult(state.npcHand)); 
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
    default: {
      return state;
    }
  }
}