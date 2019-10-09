import React from 'react'
import Card from './Card'
// import Placeholder from './Placeholder';

<<<<<<< HEAD
function Hand (props) {
  function getCardInfoFromChild (cardInfo) {
    console.log(cardInfo)
    props.receiveCardInformation(cardInfo)
  }

  return (
    <div className={props.CSSclass}>
      {props.cards.map((card, i) => <Card
        selectedCardOccurencies={props.selectedCardOccurencies}
        receiveCardInformation={getCardInfoFromChild}
        key={i}
        selectedCards={props.selectedCards}
        player={props.player}
        npc={props.npc}
        cardCode={card}
      />)}
    </div>
  )
}
=======
function Hand(props){

    function getCardInfoFromChild(cardInfo){
        props.receiveCardInformation(cardInfo)
    }

    return (
        <div className={props.CSSclass}>
            {props.cards.map((card, i) => <Card
                selectedCardOccurencies={props.selectedCardOccurencies}
                receiveCardInformation={getCardInfoFromChild}
                key={i}
                selectedCards={props.selectedCards}
                player={props.player}
                npc={props.npc}
                cardCode={card}
                />)}
        </div>
    );
}

>>>>>>> 6445cd8822e69349e3ce9d48b3ead191f157be63

export default Hand
