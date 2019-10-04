import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Sidebar from './Components/Sidebar';
import Placeholder from './Components/Placeholder';
import Hand from './Components/Hand';
import createDeck from './utils/createDeck';

import { startNewGame, onFold, onCall, onPlayerRaise } from './models/App/app.actions.creator';
import { getPlayerHand, getNpcHand, getNpcBet, getPlayerBet, getNpcBalance, getPlayerBalance, getRaiseAmount } from './models/App/app.stateSelectors';

let indexes = [];
let selectedCards = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.appState;
    
    this.getCardInfoFromChild = this.getCardInfoFromChild.bind(this);
    this.changeCards = this.changeCards.bind(this);
    this.receiveNpcBalanceInfo = this.receiveNpcBalanceInfo.bind(this);
    this.receivePlayerBalanceInfo = this.receivePlayerBalanceInfo.bind(this);
  }

  getCardInfoFromChild(dataFromChild) {
    let occurencies;
    if (dataFromChild.selected) {
      selectedCards.push(dataFromChild.cardCode);
      const uniquePickedcards = [...new Set(selectedCards)];
      indexes.push(this.state.playerHand.indexOf(dataFromChild.cardCode));
      occurencies = this.giveSelectedCardIndexesOccurencies(indexes);
      this.setState({
        cardInfo: dataFromChild,
        uniqueSelectedCards: uniquePickedcards,
        indexOccurencies: occurencies
      });
      if (dataFromChild.selected
        && uniquePickedcards.length <= 3
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
    let uniqueCards = this.state.uniqueSelectedCards;
    let randomCards = createDeck.drawCards(this.state.deck, uniqueCards.length);
    if (this.state.cardInfo.selected && this.state.uniqueSelectedCards.length <= 3) {
      let playerHand = this.state.playerHand.map(card => uniqueCards.includes(card) ? randomCards.pop() : card);
      this.setState({
        playerHand: playerHand,
        disableBtn: true
      });
    }
    indexes = [];
  }

  receivePlayerBalanceInfo(dataFromChild){
    this.setState({
      currentNpcBalance: dataFromChild
    })
  }

  receiveNpcBalanceInfo(dataFromChild){
    this.setState({
      currentPlayerBalance: dataFromChild
    })
  }

  render() {
    const { 
      playerHand,
      npcHand,
      playerBet,
      npcBet,
      onPlayerRaise,
      currentNpcBalance,
      currentPlayerBalance,
      onCall,
      onFold,
      startNewGame
    } = this.props;

    return (
      <div className="app-style">
        <div className={"npc-label-style"}>NPC Balance</div>
          <Placeholder
            CSSclass={"npc-placeholder"}
            value={`${this.props.npcBalance}`}
            readOnly={true}
          />
          <Hand
            CSSclass="npc-hand"
            npc={true}
            cards={this.props.npcHand}
            receiveCardInformation={this.getCardInfoFromChild}
          />
          <Sidebar
            readOnly={false}
            onCall={()=> onCall({playerHand, npcHand, playerBet, npcBet})}
            onFold={onFold}
            onRaise={()=>onPlayerRaise({playerBet, npcBet, currentNpcBalance, currentPlayerBalance})}
            startNewGame={startNewGame}
            disableBtn={this.state.disableBtn}
            changeCards={this.changeCards}
            emptyInputs={npcBet}
            sendNpcBalanceInfo={this.receiveNpcBalanceInfo}
            sendPlayerBalanceInfo={this.receivePlayerBalanceInfo}
          />
          <div className={"player-label-style"}>Player Balance</div>
          <Placeholder
              CSSclass={"player-placeholder"}
              value={`${this.props.playerBalance}`}
              readOnly={true}
              />
          <Hand
              CSSclass="player-hand"
              npc={false}
              cards={this.props.playerHand}
              receiveCardInformation={this.getCardInfoFromChild}
              selectedCards={this.state.uniqueSelectedCards}
              player={this.props.playerHand}
              selectedCardOccurencies={this.state.indexOccurencies}
          />
        </div>
      );
    }
  }

const mapStateToProps = (state) => ({
  appState: state.app,
  playerHand: getPlayerHand(state.app),
  playerBet: getPlayerBet(state.app),
  playerBalance: getPlayerBalance(state.app),
  npcHand: getNpcHand(state.app),
  npcBet: getNpcBet(state.app),
  npcBalance: getNpcBalance(state.app),
  raiseAmount: getRaiseAmount(state.app) 
});

const mapDispatchToProps = (dispatch) => ({
  onFold: () => {
    alert('You lose :(');
    dispatch(onFold());
  },
  onCall: (payload) => {
    dispatch(onCall(payload));
  },
  startNewGame: () => {
    dispatch(startNewGame());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

