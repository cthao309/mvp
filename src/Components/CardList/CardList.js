import React from 'react';
import CardListItem from '../CardListItem/CardListItem.js';

import './CardList.css';

const CardList = ({cards, removeListItem, handleClickOnEditList}) => {

  console.log('Cards => ', cards);
  let data = [...cards];
  data.pop();

  let cardList = data.map((item, index) => {
    return <CardListItem
          key={item._id}
          id={index}
          _id={item._id}
          item={item}
          removeListItem={removeListItem}
          handleClickOnEditList={handleClickOnEditList}
          removeListItem={removeListItem}
        />
  })

  return (
    <table className="Cardlist">
      <thead className="textStyle">
        <tr>
          <th className="reduceSize">#</th>
          <th>Word</th>
          <th>Translation</th>
          <th>Level</th>
          <th>Completed</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {cardList}
      </tbody>
    </table>
  )
}

export default CardList;