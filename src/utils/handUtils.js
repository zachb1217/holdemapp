const cardTypes = require('../constants/cardTypes');
const suits = require('../constants/suits');
const handTypes = require('../constants/handTypes');
const _ = require('lodash');

const determineHighCard = (cards) => {
  cards.sort((x,y) => x.value - y.value);
  let n = cards.length;
  let hand = cards.slice(n-5,n);
  let highCard = cards[n-1].value;
  return {
    handType: handTypes.highCard,
    hand: hand,
    highCard: highCard
  };
};

const determinePair = (cards) => {
  const cardValues = cards.map(card => card.value);
  const cardValueDict = {};
  cardValues.forEach(value => {
    cardValueDict.hasOwnProperty(value)? cardValueDict[value]+= 1: cardValueDict[value] = 1;
  });
  let pair = [...new Set(cardValues.filter(key => cardValueDict[key] == 2))];
  if (pair.length == 1) {
    let hand = cards.filter(card => cardValueDict[card.value] == 2);
    let extraCards = cards.filter(card => cardValueDict[card.value] != 2);
    let n = extraCards.length;
    extraCards.sort((x,y) => x.value - y.value);
    hand.push(...extraCards.slice(n-3, n));
    hand.sort((x,y) => x.value - y.value);
    let highCard = extraCards[n-1].value;
    return {
      handType: handTypes.pair,
      hand: hand,
      highCard: highCard,
      pair: pair[0]
    };
  }
  return {
    handType: null,
    hand: [],
    highCard: null
  };
};

const determineTwoPair = (cards) => {
  cards.sort((x,y) => x.value - y.value);
  const cardValues = cards.map(card => card.value);
  const cardValueDict = {};
  cardValues.forEach(value => {
    cardValueDict.hasOwnProperty(value)? cardValueDict[value]+= 1: cardValueDict[value] = 1;
  });
  let pair = [...new Set(cardValues.filter(key => cardValueDict[key] == 2))];
  if (pair.length == 3) {
    let n = cards.length;
    let hand = cards.filter(card => cardValueDict[card.value] == 2).slice(n-5, n);
    let extraCards = cards.filter(card => cardValueDict[card.value] == 2).slice(0,2);
    extraCards.push(...cards.filter(card => cardValueDict[card.value] != 2));
    extraCards.sort((x,y) => x.value - y.value);
    hand.push(extraCards[extraCards.length - 1]);
    let highCard = extraCards[extraCards.length - 1].value;
    return {
      handType: handTypes.twoPair,
      hand: hand,
      highCard: highCard
    };
  } else if (pair.length == 2) {
    let hand = cards.filter(card => cardValueDict[card.value] == 2);
    let extraCards = cards.filter(card => cardValueDict[card.value] != 2);
    extraCards.sort((x,y) => x.value - y.value);
    hand.push(extraCards[extraCards.length - 1]);
    let highCard = extraCards[extraCards.length - 1].value;
    return {
      handType: handTypes.twoPair,
      hand: hand,
      highCard: highCard
    };
  }
  return {
    handType: null,
    hand: [],
    highCard: null
  };
};

const determineSet = (cards) => {
  const cardValues = cards.map(card => card.value);
  const cardValueDict = {};
  cardValues.forEach(value => {
    cardValueDict.hasOwnProperty(value)? cardValueDict[value]+= 1: cardValueDict[value] = 1;
  });
  let set = [...new Set(cardValues.filter(key => cardValueDict[key] === 3))];
  if (set.length == 1) {
    let hand = cards.filter(card => cardValueDict[card.value] === 3);
    let extraCards = cards.filter(card => cardValueDict[card.value] != 3);
    let highCard = Math.max(...extraCards.map(card => card.value));
    extraCards.sort((x,y) => x.value - y.value);
    let n = extraCards.length;
    hand.push(...extraCards.splice(n-2, n));
    hand.sort((x,y) => x.value - y.value);
    return {
      handType: handTypes.set,
      hand: hand,
      highCard: highCard
    };
  }
  return {
    handType: null,
    hand: [],
    highCard: null
  };
};

const determineStraight = (cards) => {
  cards.sort((x,y) => x.value-y.value);
  for (let i = 0; i < cards.length - 4; i++) {
    let arr = [];
    for (var j = i; j < cards.length; j++) {
      if (arr.length == 0) {
        arr.push(cards[j]);
        continue;
      } else if (cards[j].value - arr[arr.length - 1].value == 1) {
        arr.push(cards[j]);
        continue;
      }
    }
    let n = arr.length;
    if (n >= 5) {
      return {
        handType: handTypes.straight,
        hand: arr.slice(n-5, n),
        highCard: Math.max(...arr.map(card => card.value))
      };
    }
  }
  if (_.isEqual(cards.map(card => card.value).slice(0,4), [2,3,4,5]) && cards[cards.length - 1].value == 14) {
    let hand = cards.slice(0,4);
    hand.unshift(cards[cards.length - 1]);
    return {
      handType: handTypes.straight,
      hand: hand,
      highCard: 5
    };
  }
  return {
    handType: null,
    hand : [],
    highCard: null
  };
};

const determineFlush = (cards) => {
  const suitValues = Object.values(suits);
  for (let i = 0; i< suitValues.length; i++) {
    let sameSuitedCards = cards.filter(card => card.suit == suitValues[i]);
    if (sameSuitedCards.length >= 5) {
      sameSuitedCards.sort((x,y) => x.value-y.value);
      let n = sameSuitedCards.length;
      let highCard = sameSuitedCards[n-1].value;
      let hand = sameSuitedCards.splice(n-5, n);

      return {
        handType: handTypes.flush,
        hand: hand,
        highCard: highCard
      };
    }
  }
  return {
    handType: null,
    hand: [],
    highCard: null
  };
};

const determineFullHouse = (cards) => {
  const cardValues = cards.map(card => card.value);
  const cardValueDict = {};
  cardValues.forEach(value => {
    cardValueDict.hasOwnProperty(value)? cardValueDict[value]+= 1: cardValueDict[value] = 1;
  });
  let set = [...new Set(cardValues.filter(key => cardValueDict[key] == 3))];
  let pair = [...new Set(cardValues.filter(key => cardValueDict[key] == 2))];
  // need to address two set case
  if (set.length === 2) {
    let hand = cards.filter(card => cardValueDict[card.value] == 3);
    hand.sort((x,y) => x-y);
    hand.shift();
    return {
      handType: handTypes.fullHouse,
      hand: hand
    };
  } else if (set.length === 1 && pair.length === 2) {
    let hand = cards.filter(card => cardValueDict[card.value] == 3);
    let highPair = Math.max(...pair);
    let handPair = cards.filter(card => cardValueDict[card.value] == 2 && card.value == highPair);
    hand.push(...handPair);
    hand.sort((x,y) => x-y);
    return {
      handType: handTypes.fullHouse,
      hand: hand,
      highCard: set[0]
    };
  } else if (set.length === 1 && pair.length === 1) {
    let hand = cards.filter(card => cardValueDict[card.value] == 3);
    let handPair = cards.filter(card => cardValueDict[card.value] == 2);
    hand.push(...handPair);
    hand.sort((x,y) => x-y);
    return {
      handType: handTypes.fullHouse,
      hand: hand,
      highCard: set[0]
    };
  };

  return {
    handType: null,
    hand: [],
    highCard: null
  };
}

const determineQuads = (cards) => {
  const cardValues = cards.map(card => card.value);
  const cardValueDict = {};
  cardValues.forEach(value => {
    cardValueDict.hasOwnProperty(value)? cardValueDict[value]+= 1: cardValueDict[value] = 1;
  });
  let quads = [...new Set(cardValues.filter(key => cardValueDict[key] == 4))];
  if (quads.length > 0) {
    let hand = cards.filter(card => cardValueDict[card.value] == 4);
    let extra = cards.filter(card => cardValueDict[card.value] != 4);
    let maxCard = extra.reduce((max, card) => card.value > max.value ? card : max, extra[0]);
    hand.push(maxCard);
    return {
      handType: handTypes.quads,
      hand: hand,
      highCard: [...new Set(hand.map(card => card.value))][0]
    };
  }
  return {
    handType: null,
    hand: [],
    highCard: null
  };
};

const determineStraightFlush = (cards) => {
  const suitValues = Object.values(suits);
  for (let i = 0; i< suitValues.length; i++) {
    let sameSuitedCards = cards.filter(card => card.suit == suitValues[i]);
    if (sameSuitedCards.length >= 5) {
      let straight = determineStraight(sameSuitedCards);
      if (straight.handType === handTypes.straight) {
        return{
          handType: handTypes.straightFlush,
          hand: straight.hand,
          highCard: straight.highCard
        };
      }
    }
  }
  return {
    handType: null,
    hand: [],
    highCard: null
  };
};

const determineRoyalFlush = (cards) => {
  const suitValues = Object.values(suits);
  for (let i = 0; i< suitValues.length; i++) {
    let sameSuitedCards = cards.filter(card => card.suit == suitValues[i]);
    if (sameSuitedCards.length >= 5) {
      sameSuitedCards.sort((x,y) => x.value - y.value);
      let cardVals = sameSuitedCards.map(card => card.value);
      if (_.isEqual(cardVals.reverse().slice(0,5), [14,13,12,11,10])) {
        let n = sameSuitedCards.length;
        return {
          handType: handTypes.royalFlush,
          hand: sameSuitedCards.slice(n - 5,n),
          highCard: null
        };
      }
    }
  }
  return {
    handType: null,
    hand: [],
    highCard: null
  };
};

const evaluateHand = (playerCards, communityCards) => {
  const cards = [...communityCards]
  cards.push(...playerCards.cards);

  const royalFlushCheck = determineRoyalFlush(cards);
  if (royalFlushCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: royalFlushCheck.handType,
      hand: royalFlushCheck.hand,
      highCard: royalFlushCheck.highCard
    };
  }

  const straightFlushCheck = determineStraightFlush(cards);
  if (straightFlushCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: straightFlushCheck.handType,
      hand: straightFlushCheck.hand,
      highCard: straightFlushCheck.highCard
    };
  }

  const quadsCheck = determineQuads(cards);
  if (quadsCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: quadsCheck.handType,
      hand: quadsCheck.hand,
      highCard: quadsCheck.highCard
    };
  }

  const fullHouseCheck = determineFullHouse(cards);
  if (fullHouseCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: fullHouseCheck.handType,
      hand: fullHouseCheck.hand,
      highCard: fullHouseCheck.highCard
    };
  }

  const flushCheck = determineFlush(cards);
  if (flushCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: flushCheck.handType,
      hand: flushCheck.hand,
      highCard: flushCheck.highCard
    };
  }

  const straightCheck = determineStraight(cards);
  if (straightCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: straightCheck.handType,
      hand: straightCheck.hand,
      highCard: straightCheck.highCard
    };
  }

  const setCheck = determineSet(cards);
  if (setCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: setCheck.handType,
      hand: setCheck.hand,
      highCard: setCheck.highCard
    };
  }

  const twoPairCheck = determineTwoPair(cards);
  if (twoPairCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: twoPairCheck.handType,
      hand: twoPairCheck.hand,
      highCard: twoPairCheck.highCard
    };
  }

  const pairCheck = determinePair(cards);
  if (pairCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: pairCheck.handType,
      hand: pairCheck.hand,
      highCard: pairCheck.highCard,
      pair: pairCheck.pair
    };
  }

  const highCardCheck = determineHighCard(cards);
  if (highCardCheck.handType != null) {
    return {
      playerId: playerCards.playerId,
      bestHand: highCardCheck.handType,
      hand: highCardCheck.hand,
      highCard: highCardCheck.highCard
    };
  }

  return {
    playerId: playerCards.playerId,
    bestHand: null,
    hand: null,
    highCard: null
  };
}

const compareTwoPlayersHands = (playerOne, playerTwo, communityCards) => {
  let playerOneBestHand = evaluateHand(playerOne, communityCards);
  let playerTwoBestHand = evaluateHand(playerTwo, communityCards);
  if (playerOneBestHand.bestHand > playerTwoBestHand.bestHand) {
    return {
      winner: [playerOne.playerId],
      bestHand: playerOneBestHand.bestHand,
      hand: playerOneBestHand.hand
    };
  } else if (playerOneBestHand.bestHand === playerTwoBestHand.bestHand) {
    if (playerOneBestHand.bestHand == handTypes.pair) {
      if (playerOneBestHand.pair > playerTwoBestHand.pair) {
        return {
          winner: [playerOne.playerId],
          bestHand: playerOneBestHand.bestHand,
          hand: playerOneBestHand.hand
        };
      } else if (playerOneBestHand.pair < playerTwoBestHand.pair) {
        return {
          winner: [playerTwo.playerId],
          bestHand: playerTwoBestHand.bestHand,
          hand: playerTwoBestHand.hand
        };
      }
    }
    if (playerOneBestHand.highCard > playerTwoBestHand.highCard) {
      return {
        winner: [playerOne.playerId],
        bestHand: playerOneBestHand.bestHand,
        hand: playerOneBestHand.hand
      };
    } else if (playerOneBestHand.highCard === playerTwoBestHand.highCard) {
      if (_.isEqual(playerOneBestHand.hand.map(card => card.value), playerTwoBestHand.hand.map(card => card.value))) {
        return {
          winner: [playerOne.playerId, playerTwo.playerId],
          bestHand: playerOneBestHand.bestHand,
          hand: [playerOneBestHand.hand, playerTwoBestHand.hand]
        };
      }
      for (var i = 4; i >= 0; i--) {
        if (playerOneBestHand.hand[i].value > playerTwoBestHand.hand[i].value) {
          return {
            winner: [playerOne.playerId],
            bestHand: playerOneBestHand.bestHand,
            hand: playerOneBestHand.hand
          };
        }
      }

    }
  }
  return {
    winner: [playerTwo.playerId],
    bestHand: playerTwoBestHand.bestHand,
    hand: playerTwoBestHand.hand
  };
};

const determineWinner = (allPlayers, communityCards) => {
  const players = [...allPlayers]
  let currentWinner = {player: players[0]};
  let moreWinners = [];
  for (let i = 1; i < players.length; i++) {
    //console.log(players[i].cards, currentWinner.cards, i);
    let tempWinner = compareTwoPlayersHands(players[i], currentWinner.player, communityCards);
    if (tempWinner.winner.length != 1) {
      moreWinners.push({
        player: players[i],
        bestHand: tempWinner.bestHand[0],
        hand: tempWinner.hand[0]
      });
      continue;
    }
    if (players[i].playerId == tempWinner.winner[0]) {
      currentWinner = {
        player: players[i],
        bestHand: tempWinner.bestHand,
        hand: tempWinner.hand
      };
      if (moreWinners.length > 0) {
        moreWinners = [];
      }
    } else {
      currentWinner.bestHand = tempWinner.bestHand;
      currentWinner.hand = tempWinner.hand;
    }
  }
  if (moreWinners.length > 0) {
    moreWinners.push(currentWinner)
    return moreWinners
  }
  return [currentWinner];
}

module.exports = determineWinner;
