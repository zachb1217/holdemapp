import actions from '../constants/actionTypes';

export const startGame = () => {
  return (dispatch) => {
    dispatch(generateDeck());
  };
}
export const generateDeck = () => {
  return {
    type: actions.generateDeck
  }
}

export const dealCard = () => {
  return {
    type: actions.dealCard
  }
}