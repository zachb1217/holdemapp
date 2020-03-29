import {combineReducers} from 'redux';
import deckReducer from './reducers/deckReducer';
import playerReducer from './reducers/playerReducer';
import gameReducer from './reducers/gameReducer';

const indexReducer = combineReducers({
   deck: deckReducer,
   player: playerReducer,
   game: gameReducer
})

export default (indexReducer);