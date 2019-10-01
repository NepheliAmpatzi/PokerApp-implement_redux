import React, { Component } from 'react';
import '../.././src/App.css';
import Button from './Button';
import Placeholder from './Placeholder';

class Sidebar extends Component{
    constructor(props){
        super(props)
        this.state = {
            raiseAmount: '',
            npcBet: '',
            playerBet: '',
            totalBet: '',
            currentNpcBalance: 1000,
            currentPlayerBalance: 1000,
        }
        this.onRaise = this.onRaise.bind(this);
        this.receiveRaiseAmount = this.receiveRaiseAmount.bind(this);
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
        this.props.sendNpcBalanceInfo(this.state.currentNpcBalance - raiseAmount)
        this.props.sendPlayerBalanceInfo(this.state.currentPlayerBalance - raiseAmount)
      }

    receiveRaiseAmount(dataFromChild){
        this.setState({
            raiseAmount: dataFromChild
        })
    }

    render(){
        return (
            <div className="gameplay-button-group">
                <Button
                    CSSclass='raise-btn'
                    name='Raise'
                    onClick={this.onRaise}/>
                <Placeholder
                    CSSclass='raise-placeholder'
                    parentCb={this.receiveRaiseAmount}
                    readOnly={false}
                    value={this.props.raiseInput}
                    />
                <Button
                    CSSclass='call-btn'
                    name='Call'
                    onClick={this.props.onCall}/>
                <Button
                    CSSclass='fold-btn'
                    name='Fold'
                    onClick={this.props.onFold}/>
                <div className='text-style'>NPC bet</div>
                <Placeholder
                    CSSclass='bet-placeholder'
                    readOnly={true}
                    value={this.state.npcBet}
                    />
                <div className='text-style'>Player bet</div>
                <Placeholder
                    CSSclass='bet-placeholder'
                    readOnly={true}
                    value={this.state.playerBet}
                    />
                <div className='text-style'>Total amount</div>
                <Placeholder
                    CSSclass='bet-placeholder'
                    readOnly={true}
                    value={this.state.totalBet}
                    />
                <Button
                    CSSclass='new-game-btn'
                    name='Start New Game'
                    onClick={this.props.startNewGame}/>
                <Button
                    CSSclass='change-cards-btn'
                    name='Change Cards'
                    onClick={this.props.changeCards}
                    disableBtn={this.props.disableBtn}/>
            </div>
        );
    }
        
    }

export default Sidebar;