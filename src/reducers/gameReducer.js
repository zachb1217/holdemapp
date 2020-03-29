import Immutable from 'immutable';
import actions from '../constants/actionTypes';
import * as deckUtils from '../utils/deckUtils';

const defaultState = {
  deck: [],
  tableCards: []
}

export default (state = Immutable.Map(defaultState), action) => {
     switch(action.type) {
       case actions.generateDeck: {
         return state.set('deck', deckUtils.generateDeck());
       }
       case actions.dealCard: {
         let deck = state.get('deck');
         let topCard = deck.pop();
         let tableCards = state.get('tableCards');
         tableCards.push(topCard);
         let newState = state.set('deck', deck);
         let newTableCards = tableCards.slice();
         newState = newState.set('tableCards', newTableCards);
         return newState;
       }
       default:
         return state;
     }
   }