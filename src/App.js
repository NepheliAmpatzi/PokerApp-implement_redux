import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Sidebar from './Components/Sidebar';
import Placeholder from './Components/Placeholder';
import Hand from './Components/Hand';
import ChangeUserBalanceButton from './Components/ChangeUserBalanceButton';
import handevaluation from './utils/handevaluation';
import createDeck from './utils/createDeck';

import { onFold, onCall, onPlayerRaise } from './models/App/app.actions.creator';
import { getPlayerHand, getNpcHand, getNpcBet, getPlayerBet, getNpcBalance, getPlayerBalance, getRaiseAmount } from './models/App/app.stateSelectors';

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
    this.startNewGame = this.startNewGame.bind(this);
    this.changeCards = this.changeCards.bind(this);
    this.receiveNpcBalanceInfo = this.receiveNpcBalanceInfo.bind(this);
    this.receivePlayerBalanceInfo = this.receivePlayerBalanceInfo.bind(this);
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

  startNewGame() {
    this.setState({
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
    const { playerHand, npcHand, playerBet, npcBet, onCall, onPlayerRaise, currentNpcBalance, currentPlayerBalance } = this.props;
    return (
      <div className="app-style">
        <ChangeUserBalanceButton /> {/* TODO: For REDUX TESTING PURPOSES, REMOVE LATER*/}
        <div className={"npc-label-style"}>NPC Balance</div>
          <Placeholder
            CSSclass={"npc-placeholder"}
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
          onCall={()=> onCall({playerHand, npcHand, playerBet, npcBet})}
          onFold={this.props.onFold}
          onRaise={()=>onPlayerRaise({playerBet, npcBet, currentNpcBalance, currentPlayerBalance})}
          startNewGame={this.startNewGame}
          disableBtn={this.state.disableBtn}
          changeCards={this.changeCards}
          emptyInputs={this.state.npcBet}
          sendNpcBalanceInfo={this.receiveNpcBalanceInfo}
          sendPlayerBalanceInfo={this.receivePlayerBalanceInfo}
        />
          <div className={"player-label-style"}>Player Balance</div>
            <Placeholder
                CSSclass={"player-placeholder"}
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
    );
  }
}

const mapStateToProps = (state) => ({
  playerHand: getPlayerHand(state.app),
  npcHand: getNpcHand(state.app),
  playerBet: getPlayerBet(state.app),
  npcBet: getNpcBet(state.app),
  currentNpcBalance: getNpcBalance(state.app),
  currentPlayerBalance: getPlayerBalance(state.app),
  amountRaised: getRaiseAmount(state.app)
});

const mapDispatchToProps = (dispatch) => ({
  onFold: () => {
    alert('You lose :(');
    dispatch(onFold());
  },
  onCall: (payload) => {
    dispatch(onCall(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

