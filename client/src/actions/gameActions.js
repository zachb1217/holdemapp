import actions from '../constants/actionTypes';

export const startGame = () => {
  return (dispatch) => {
    dispatch(addPlayer('zac'));
    dispatch(addPlayer('zacc'));
    dispatch(addPlayer('zuck'));
    dispatch(addPlayer('bill'));
    dispatch(generateDeck());
    dispatch(dealHands());
  };
}
export const generateDeck = () => {
  return {
    type: actions.generateDeck
  }
}

export const dealHands = () => {
  return {
    type: actions.dealHands
  }
}

export const dealCards = (amount) => {
  return {
    type: actions.dealCards,
    payload: amount
  }
}

export const addPlayer = (playerName) => {
  return {
    type: actions.addPlayer,
    payload: playerName
  }
}