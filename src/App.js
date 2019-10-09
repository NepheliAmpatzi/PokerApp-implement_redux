<<<<<<< HEAD
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Sidebar from './Components/Sidebar'
import Placeholder from './Components/Placeholder'
import Hand from './Components/Hand'
import ChangeUserBalanceButton from './Components/ChangeUserBalanceButton'
import handevaluation from './utils/handevaluation'
import createDeck from './utils/createDeck'

import {
  onFold,
  onCall,
  onPlayerRaise
} from './models/App/app.actions.creator'
import {
  getPlayerHand,
  getNpcHand,
  getNpcBet,
  getPlayerBet,
  getNpcBalance,
  getPlayerBalance,
  getRaiseAmount
} from './models/App/app.stateSelectors'
=======
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Sidebar from './Components/Sidebar';
import Placeholder from './Components/Placeholder';
import Hand from './Components/Hand';
import createDeck from './utils/createDeck';

import { startNewGame, fold, call, raise } from './models/App/app.actions.creator';
import { getPlayerHand, getNpcHand, getNpcBet, getPlayerBet, getNpcBalance, getPlayerBalance, getRaiseAmount } from './models/App/app.stateSelectors';

let indexes = [];
let selectedCards = [];
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63

const deck = createDeck.shuffleDeck(createDeck.generateDeck())
let indexes = []
const selectedCards = []
const test = 'res'
class App extends Component {
<<<<<<< HEAD
  constructor (props) {
    super(props)
    this.state = {
      playerHand: createDeck.drawCards(deck, 5),
      npcHand: createDeck.drawCards(deck, 5),
      deck: deck,
      indexOccurencies: {},
      uniqueselectedCards: [],
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
    this.getCardInfoFromChild = this.getCardInfoFromChild.bind(this)
    this.startNewGame = this.startNewGame.bind(this)
    this.changeCards = this.changeCards.bind(this)
    this.receiveNpcBalanceInfo = this.receiveNpcBalanceInfo.bind(
      this
    )
    this.receivePlayerBalanceInfo = this.receivePlayerBalanceInfo.bind(
      this
    )
  }

  getCardInfoFromChild (dataFromChild) {
    let occurencies
    if (dataFromChild.selected) {
      selectedCards.push(dataFromChild.cardCode)
      const uniquepickedcards = [...new Set(selectedCards)]
      indexes.push(
        this.state.playerHand.indexOf(dataFromChild.cardCode)
      )
      occurencies = this.giveSelectedCardIndexesOccurencies(indexes)
=======
  constructor(props) {
    super(props);
    this.state = props.appState;
    
    this.getCardInfoFromChild = this.getCardInfoFromChild.bind(this);
    this.changeCards = this.changeCards.bind(this);
    // this.receiveNpcBalanceInfo = this.receiveNpcBalanceInfo.bind(this);
    // this.receivePlayerBalanceInfo = this.receivePlayerBalanceInfo.bind(this);
  }

  //returns 2 pieces of info: kwdikos, selected
  getCardInfoFromChild(dataFromChild) {
    let occurencies;
    if (dataFromChild.selected) {
      selectedCards.push(dataFromChild.cardCode);
      const uniquePickedcards = [...new Set(selectedCards)];
      indexes.push(this.state.playerHand.indexOf(dataFromChild.cardCode));
      occurencies = this.giveSelectedCardIndexesOccurencies(indexes);
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
      this.setState({
        cardInfo: dataFromChild,
        uniqueSelectedCards: uniquePickedcards,
        indexOccurencies: occurencies
<<<<<<< HEAD
      })
      if (
        dataFromChild.selected &&
        uniquepickedcards.length <= 3 &&
        Object.values(occurencies).every(value => value === 1)
      ) {
        this.setState({ disableBtn: false })
=======
      });
      if (dataFromChild.selected
        && uniquePickedcards.length <= 3
        && Object.values(occurencies).every(value => value === 1)) {
        this.setState({ disableBtn: false });
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
      }
    }
  }

<<<<<<< HEAD
  giveSelectedCardIndexesOccurencies (list) {
=======
  //helper for getting indeces for selected cards in hand.
  giveSelectedCardIndexesOccurencies(list) {
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
    const countIndexes = list.reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1
      return obj
    }, {})
    return countIndexes
  }

<<<<<<< HEAD
  changeCards () {
    const uniquecards = this.state.uniqueselectedCards
    const randomCards = createDeck.drawCards(
      this.state.deck,
      uniquecards.length
    )
    if (
      this.state.cardInfo.selected &&
      this.state.uniqueselectedCards.length <= 3
    ) {
      const playerhand = this.state.playerHand.map(card =>
        uniquecards.includes(card) ? randomCards.pop() : card
      )
=======
  //callback for action.
  changeCards() {
    let uniqueCards = this.state.uniqueSelectedCards;
    let randomCards = createDeck.drawCards(this.state.deck, uniqueCards.length);
    if (this.state.cardInfo.selected && this.state.uniqueSelectedCards.length <= 3) {
      let playerHand = this.state.playerHand.map(card => uniqueCards.includes(card) ? randomCards.pop() : card);
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
      this.setState({
        playerHand: playerHand,
        disableBtn: true
      })
    }
    indexes = []
  }

<<<<<<< HEAD
  receivePlayerBalanceInfo (dataFromChild) {
    this.setState({
      currentNpcBalance: dataFromChild
    })
  }

  receiveNpcBalanceInfo (dataFromChild) {
    this.setState({
      currentPlayerBalance: dataFromChild
    })
  }

  startNewGame () {
    this.setState({
      playerHand: createDeck.drawCards(
        createDeck.shuffleDeck(createDeck.generateDeck()),
        5
      ),
      npcHand: createDeck.drawCards(
        createDeck.shuffleDeck(createDeck.generateDeck()),
        5
      ),
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
    })
  }

  render () {
    const {
=======
  // receivePlayerBalanceInfo(dataFromChild){
  //   this.setState({
  //     currentNpcBalance: dataFromChild
  //   });
  // }

  // receiveNpcBalanceInfo(dataFromChild){
  //   this.setState({
  //     currentPlayerBalance: dataFromChild
  //   });
  // }

  render() {
    const { 
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
      playerHand,
      npcHand,
      playerBet,
      npcBet,
<<<<<<< HEAD
      onCall,
      onPlayerRaise,
      currentNpcBalance,
      currentPlayerBalance
    } = this.props
    return (
      <div className="app-style">
        <ChangeUserBalanceButton />{' '}
        {/* TODO: For REDUX TESTING PURPOSES, REMOVE LATER */}
        <div className={'npc-label-style'}>NPC Balance</div>
        <Placeholder
          CSSclass={'npc-placeholder'}
          value={currentNpcBalance}
          readOnly={true}
        />
        <Hand
          CSSclass="npc-hand"
          npc={true}
          cards={this.state.npcHand}
          receiveCardInformation={this.getCardInfoFromChild}
        />
        <Sidebar
          readOnly={false}
          onCall={() =>
            onCall({ playerHand, npcHand, playerBet, npcBet })
          }
          onFold={this.props.onFold}
          onRaise={() =>
            onPlayerRaise({
              playerBet,
              npcBet,
              currentNpcBalance,
              currentPlayerBalance
            })
          }
          startNewGame={this.startNewGame}
          disableBtn={this.state.disableBtn}
          changeCards={this.changeCards}
          emptyInputs={this.state.npcBet}
          sendNpcBalanceInfo={this.receiveNpcBalanceInfo}
          sendPlayerBalanceInfo={this.receivePlayerBalanceInfo}
        />
        <div className={'player-label-style'}>Player Balance</div>
        <Placeholder
          CSSclass={'player-placeholder'}
          value={currentPlayerBalance}
          readOnly={true}
        />
        <Hand
          CSSclass="player-hand"
          npc={false}
          cards={this.state.playerHand}
          receiveCardInformation={this.getCardInfoFromChild}
          selectedCards={this.state.uniqueselectedCards}
          player={this.state.playerHand}
          selectedCardOccurencies={this.state.indexOccurencies}
        />
      </div>
    )
=======
      npcBalance,
      playerBalance,
      onCall,
      onFold,
      onRaise,
      startNewGame
    } = this.props;

    return (
      <div className="app-style">
        <div className={'npc-label-style'}>NPC Balance</div>
          <Placeholder
            CSSclass={'npc-placeholder'}
            value={`${npcBalance}`}
            readOnly={true}
          />
          <Hand
            CSSclass="npc-hand"
            npc={true}
            cards={npcHand}
            receiveCardInformation={npcBalance}
          />
          <Sidebar
            readOnly={false}
            onCall={()=> onCall({playerHand, npcHand, playerBet, npcBet})}
            onFold={onFold}
            onRaise={onRaise}
            startNewGame={startNewGame}
            disableBtn={this.state.disableBtn}
            changeCards={this.changeCards}
            emptyInputs={npcBet}
            sendNpcBalanceInfo={npcBalance}
            sendPlayerBalanceInfo={this.receivePlayerBalanceInfo}
          />
          <div className={'player-label-style'}>Player Balance</div>
          <Placeholder
              CSSclass={'player-placeholder'}
              value={`${playerBalance}`}
              readOnly={true}
              />
          <Hand
              CSSclass="player-hand"
              npc={false}
              cards={playerHand}
              receiveCardInformation={playerBalance}
              selectedCards={this.state.uniqueSelectedCards}
              player={playerHand}
              selectedCardOccurencies={this.state.indexOccurencies}
          />
        </div>
      );
    }
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
  }

<<<<<<< HEAD
const mapStateToProps = state => ({
=======
const mapStateToProps = (state) => ({
  appState: state.app,
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
  playerHand: getPlayerHand(state.app),
  playerBet: getPlayerBet(state.app),
  playerBalance: getPlayerBalance(state.app),
  npcHand: getNpcHand(state.app),
  npcBet: getNpcBet(state.app),
<<<<<<< HEAD
  currentNpcBalance: getNpcBalance(state.app),
  currentPlayerBalance: getPlayerBalance(state.app),
  amountRaised: getRaiseAmount(state.app)
})

const mapDispatchToProps = dispatch => ({
  onFold: () => {
    alert('You lose :(')
    dispatch(onFold())
=======
  npcBalance: getNpcBalance(state.app),
  raiseAmount: getRaiseAmount(state.app) 
});

const mapDispatchToProps = (dispatch) => ({
  onRaise: () => {
    dispatch(raise());
  },
  onFold: () => {
    alert('You lose :(');
    dispatch(fold());
  },
  onCall: (payload) => {
    dispatch(call(payload));
  },
  startNewGame: () => {
    dispatch(startNewGame());
>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63
  },
  onCall: payload => {
    dispatch(onCall(payload))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
