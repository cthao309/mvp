import React from 'react';
import CardListItem from '../CardListItem/CardListItem.js';

import './CardList.css';

const CardList = ({cards, removeListItem, handleClickOnEditList}) => {

  console.log('Cards => ', cards);
  let data = [...cards];
  data.pop();

  let cardList = data.map((item, index) => {
    return <CardListItem
          id={index}
          db_id={item._id}
          item={item}
          key={item._id}
          removeListItem={removeListItem}
          handleClickOnEditList={handleClickOnEditList}
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