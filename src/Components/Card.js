import React, { Component } from 'react'
import '../.././src/App.css'
import handevaluation from '../utils/handevaluation'

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cardInfo: {
        cardCode: this.props.cardCode,
        selected: false
      }
    }
    this.cardinformation = {
      cardCode: this.props.cardCode,
      selected: true
    }
    this.selectedCard = this.selectedCard.bind(this)
  }

  getCardCss (num, suit) {
    return 'rank-' + num.toString().toLowerCase() + ' ' + suit
  }

  getSuitSymbol (suit) {
    let suitHtml = ''
    switch (suit) {
      case 'spades': suitHtml = '♠'; break
      case 'hearts': suitHtml = '♥'; break
      case 'clubs': suitHtml = '♣'; break
      case 'diams': suitHtml = '♦'; break
      default: suitHtml = ''; break
    }
    return suitHtml
  }

  selectedCard () {
    this.setState({ cardInfo: this.cardinformation })
    this.props.receiveCardInformation(this.cardinformation)
  }

  render () {
    const { NumberL, SuitL } = handevaluation.getCardLiteralsFromCardCode(this.props.cardCode)
    return (
      <div className="playingCards fourColours ">
        <a
          onClick={this.selectedCard}
          className={this.props.npc
            ? 'card back'
            : this.state.cardInfo.selected &&
            this.props.selectedCards.length <= 3 &&
            this.props.player.includes(this.state.cardInfo.cardCode) &&
            Object.values(this.props.selectedCardOccurencies).every(value => value === 1)
              ? 'selected-card card ' + this.getCardCss(NumberL, SuitL) : 'card ' + this.getCardCss(NumberL, SuitL)}>
          <span className="rank">{NumberL}</span>
          <span className="suit">{this.getSuitSymbol(SuitL)}</span>
        </a>
      </div>
    )
  }
}

export default Card
