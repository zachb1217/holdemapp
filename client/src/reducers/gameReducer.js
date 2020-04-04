import Immutable from 'immutable';
import actions from '../constants/actionTypes';
import * as deckUtils from '../utils/deckUtils';
import _ from 'lodash';

const defaultState = {
  deck: [],
  tableCards: [],
  players: []
}

export default (state = Immutable.Map(defaultState), action) => {
     switch(action.type) {
       case actions.generateDeck: {
         return state.set('deck', deckUtils.generateDeck());
       }
       case actions.dealHands: {
         let deck = state.get('deck').slice();
         let players = state.get('players').slice();
         _.forEach(players, (player) => {
           let hand = player.hand === undefined ? [] : player.hand;
           let update = deckUtils.deal(deck, hand, 2);
           player.hand = update.target;
           deck = update.deck;
         });
         let newState = state;
         newState = newState.set('players', players);
         return newState.set('deck', deck);
       }
       case actions.dealCards: {
         let deck = state.get('deck');
         let tableCards = state.get('tableCards');
         if (deck.length === 0) {
           return state;
         }
         let update = deckUtils.deal(deck, tableCards, action.payload);
         let newState = state.set('deck', update.deck);
         newState = newState.set('tableCards', update.target);
         return newState;
       }
       case actions.addPlayer: {
         var newPlayer = {
           playerName: action.payload
         }
         let players = state.get('players').slice();
         players.push(newPlayer);
         return state.set('players', players);
       }
       default:
         return state;
     }
   }