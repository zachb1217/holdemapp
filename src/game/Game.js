import React from 'react';
import {connect} from 'react-redux';
import * as gameActions from '../actions/gameActions';
import '../styles/Game.css';
import {Table} from './Table';
import PlayerSection from './PlayerSection';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.props.startGame();
  }
  render() {
    return <div>
      <button onClick={this.props.dealCard}>DEAL</button>
      <Table cards={this.props.tableCards}/>
      <hr className='divider'/>
      <PlayerSection players={this.props.players}/>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    deck: state.game.get('deck'),
    tableCards: state.game.get('tableCards'),
    players: state.game.get('players')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
      dispatch(gameActions.startGame());
    },
    dealCard: () => {
      dispatch(gameActions.dealCards(1));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);