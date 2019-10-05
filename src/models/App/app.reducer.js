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
  START_NEW_GAME
} from './app.actions.creator';

import {
  getPlayerBalance,
  getNpcBalance,
  getNpcBet,
} from './app.stateSelectors';

const deck = shuffleDeck(generateDeck());

export const initialState = {
  app: {
    playerHand: drawCards(shuffleDeck(deck), 5),
    npcHand: drawCards(shuffleDeck(deck), 5),
    deck: deck,
    indexOccurencies: {},
    uniqueSelectedCards: [],
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
        raiseAmount: 0,
        npcBet: 0,
        playerBet: 0,
        totalBet: 0,
        playerWins: false,
        npcWins: false,
        tie: false,
        cardInfo: {
          cardCode: null,
          selected: false
        }
      };
    }
    case (RAISE): {
      const raiseAmnt = document.getElementsByClassName('raise-placeholder')[0].value; //Get text from input field. Think of a better solution later
      const currentPlayerBalance = getPlayerBalance(state) - raiseAmnt;
      const playerBet = Number(getNpcBet(state)) + Number(raiseAmnt);
      const currentNpcBalance = getNpcBalance(state) - raiseAmnt;
      const npcBet = Number(getNpcBet(state)) + Number(raiseAmnt);
      const totalBet = Number(playerBet) + Number(npcBet);
      document.getElementsByClassName('raise-placeholder')[0].value = ''; //Set text from input field. Think of a better solution later

      return {
        ...state,
        raiseAmount: raiseAmnt,
        currentPlayerBalance,
        currentNpcBalance,
        playerBet,
        npcBet,
        totalBet
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
    default: {
      return state;
    }
  }
};