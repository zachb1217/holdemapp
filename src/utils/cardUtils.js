import React from 'react';

export const generateImg = (card) => {
  const resourceString = '/pokercards/' + card.id + '.png';
  return (
    <img key={card.id} className='Card' src={resourceString} alt={card.Value + 'of' + card.Suit}/>
  );
}