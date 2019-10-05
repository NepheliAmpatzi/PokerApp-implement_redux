import React from 'react';
import Card from './Card';
// import Placeholder from './Placeholder';

function Hand(props){

    function getCardInfoFromChild(cardInfo){
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
    );
}


export default Hand;