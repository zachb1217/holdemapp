import cardTypes from '../constants/cardTypes';

export const generateDeck = () => {
  return shuffle(Object.values(cardTypes));
}

const shuffle = (deck) => {
  var shuffledDeck = deck.slice();
  for (var i = shuffledDeck.length - 1; i >= 0; i--) {
    var rand = randomInt(i);
    var temp = shuffledDeck[rand];
    shuffledDeck[rand] = shuffledDeck[i];
    shuffledDeck[i] = temp;
  }
  return shuffledDeck;
}

const randomInt = (max) => {
  return Math.floor(Math.random() * max);
}
