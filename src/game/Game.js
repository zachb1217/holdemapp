import React from 'react';
import {connect} from 'react-redux';
import * as gameActions from '../actions/gameActions';
import * as deckUtils from '../utils/deckUtils';
import {Table} from './Table';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.props.startGame();
  }
  render() {
    return <div>
      <button onClick={this.props.dealCard}>DEAL</button>
      <Table cards={this.props.tableCards}/>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    deck: state.game.get('deck'),
    tableCards: state.game.get('tableCards')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
      dispatch(gameActions.startGame());
    },
    dealCard: () => {
      dispatch(gameActions.dealCard());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);