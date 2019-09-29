import React from 'react';
import Card from './Card';
import Placeholder from './Placeholder';

function Hand(props){

    function getCardInfoFromChild(cardInfo){
        console.log(cardInfo);
        props.receiveCardInformation(cardInfo);
    }

    return (
        <div className={props.CSSclass}>
        <div>
        <div className={props.labelStyle}>{props.label}</div>
        <Placeholder
            CSSclass={props.npc ? "npc-placeholder" : "player-placeholder"}
            value={props.value}
            readOnly={props.readOnly}
            />
        </div>
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