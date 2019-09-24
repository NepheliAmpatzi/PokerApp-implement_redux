import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Sidebar from './Components/Sidebar';
import Hand from './Components/Hand';
import ChangeUserBalanceButton from './Components/ChangeUserBalanceButton';
import handevaluation from './utils/handevaluation';
import createDeck from './utils/createDeck';

import { onFold, onCall } from './models/App/app.actions.creator';
import { getPlayerHand, getNpcHand, getNpcBet, getPlayerBet } from './models/App/app.stateSelectors';

const deck = createDeck.shuffleDeck(createDeck.generateDeck());
let indexes = [];
let selectedCards = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHand: createDeck.drawCards(deck, 5),
      npcHand: createDeck.drawCards(deck, 5),
      deck: deck,
      indexOccurencies: {},
      uniqueselectedCards: [],
      raiseAmount: '',
      npcBet: '',
      playerBet: '',
      totalBet: '',
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
    };
    this.getCardInfoFromChild = this.getCardInfoFromChild.bind(this);
    this.onRaise = this.onRaise.bind(this);
    // this.onCall = this.onCall.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.changeCards = this.changeCards.bind(this);
    this.receiveRaiseInfo = this.receiveRaiseInfo.bind(this);

  }

  getCardInfoFromChild(dataFromChild) {
    let occurencies;
    if (dataFromChild.selected) {
      selectedCards.push(dataFromChild.cardCode);
      const uniquepickedcards = [...new Set(selectedCards)];
      indexes.push(this.state.playerHand.indexOf(dataFromChild.cardCode));
      occurencies = this.giveSelectedCardIndexesOccurencies(indexes);
      this.setState({
        cardInfo: dataFromChild,
        uniqueselectedCards: uniquepickedcards,
        indexOccurencies: occurencies
      });
      if (dataFromChild.selected
        && uniquepickedcards.length <= 3
        && Object.values(occurencies).every(value => value === 1)) {
        this.setState({ disableBtn: false });
      }
    }
  }

  giveSelectedCardIndexesOccurencies(list) {
    const countIndexes = list.reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});
    return countIndexes;
  }

  changeCards() {
    let uniquecards = this.state.uniqueselectedCards;
    let randomCards = createDeck.drawCards(this.state.deck, uniquecards.length);
    if (this.state.cardInfo.selected && this.state.uniqueselectedCards.length <= 3) {
      let playerhand = this.state.playerHand.map(card => uniquecards.includes(card) ? randomCards.pop() : card);
      this.setState({
        playerHand: playerhand,
        disableBtn: true
      });
    }
    indexes = [];
  }

  

  receiveRaiseInfo(dataFromChild) {
    this.setState({
      raiseAmount: dataFromChild
    });
  }

  onRaise() {
    const raiseAmount = Number(this.state.raiseAmount);
    const allBets = {
      player: Number(this.state.playerBet) + raiseAmount,
      npc: Number(this.state.playerBet) + raiseAmount
    };
    this.setState({
      npcBet: allBets.npc,
      playerBet: allBets.player,
      totalBet: allBets.npc + allBets.player,
      currentNpcBalance: this.state.currentNpcBalance - raiseAmount,
      currentPlayerBalance: this.state.currentPlayerBalance - raiseAmount
    });
  }

  async startNewGame() {
    await this.setState({
      playerHand: createDeck.drawCards(createDeck.shuffleDeck(createDeck.generateDeck()), 5),
      npcHand: createDeck.drawCards(createDeck.shuffleDeck(createDeck.generateDeck()), 5),
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
    });
  }

  render() {
    return (
      <div className="app-style">
        <ChangeUserBalanceButton /> {/* TODO: For REDUX TESTING PURPOSES, REMOVE LATER*/}
        <Hand
          labelStyle="npc-label-style"
          label="NPC Balance"
          CSSclass="npc-hand"
          npc={true}
          cards={this.state.npcHand}
          receiveCardInformation={this.getCardInfoFromChild}
          value={this.state.currentNpcBalance}
        />
        <Sidebar
          readOnly={false}
          onRaise={this.onRaise}
          onCall={this.props.onCall}
          onFold={this.props.onFold}
          totalBet={this.state.totalBet}
          playerBet={this.state.playerBet}
          npcBet={this.state.npcBet}
          startNewGame={this.startNewGame}
          disableBtn={this.state.disableBtn}
          changeCards={this.changeCards}
          emptyInputs={this.state.npcBet}
          sendInfo={this.receiveRaiseInfo}
        />
        <Hand
          label="Player Balance"
          labelStyle="player-label-style"
          CSSclass="player-hand"
          npc={false}
          cards={this.state.playerHand}
          receiveCardInformation={this.getCardInfoFromChild}
          value={this.state.currentPlayerBalance}
          selectedCards={this.state.uniqueselectedCards}
          player={this.state.playerHand}
          selectedCardOccurencies={this.state.indexOccurencies}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFold: () => {
      alert('You lose :(');
      dispatch(onFold());
  },
  onCall: () => {
    dispatch(onCall());
  }
  });

  const mapStateToProps = (state) => ({
    playerHand: getPlayerHand(state.app),
    npcHand: getNpcHand(state.app),
    playerBet: getPlayerBet(state.app),
    npcBet: getNpcBet(state.app)
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);

