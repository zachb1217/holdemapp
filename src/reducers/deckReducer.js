import Immutable from 'immutable';
import actions from '../constants/actionTypes';
import * as deckUtils from '../utils/deckUtils';

export default (state = [], action) => {
     switch(action) {
       case action.generateDeck: {
         return deckUtils.generateDeck();
       }
       default:
         return state;
     }
   }