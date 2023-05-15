import React, { useEffect, useState } from 'react';
import { getCardsInfo } from 'Src/tools/localStorage';
import { Button } from 'antd';
import './index.less';

function HabitCard() {
  const [cardNode, setCardNode] = useState(<div />);

  function getCreateBtn() {
    return (
      <Button type='primary' size='large'>
        建立“习惯积分卡”
      </Button>
    );
  }

  useEffect(() => {
    const cardsInfo = getCardsInfo();

    if (cardsInfo || cardsInfo.length === 0) {
      const createBtn = getCreateBtn();

      setCardNode(createBtn);
    }
  }, []);

  return <div className='habit_card'>{cardNode}</div>;
}

export default HabitCard;
