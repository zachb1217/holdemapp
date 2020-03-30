import React from 'react';
import {connect} from 'react-redux';
import * as cardUtils from '../utils/cardUtils';
import _ from 'lodash';
import '../styles/Player.css';

export class PlayerSection extends React.Component {
  render() {
    return <div className='Player-Section'>
    <header>'Hello'</header>
    {
      _.map(this.props.players, (player) => {
        return <div className='One-Player'>
        {player.playerName}
        <div>
        {_.map(player.hand, cardUtils.generateImg)}
        </div>
        </div>
      })
    }
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    minBet: null,
    curBet: null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bet: null,
    check: null,
    fold: null

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerSection);