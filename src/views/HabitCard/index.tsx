import React, { useEffect, useState, useCallback } from 'react';
import { getCardsInfo } from 'Utils/localStorage';
import Card from 'Components/Card';
import { Button } from 'antd';
import './index.less';

function HabitCard() {
  const [cardNode, setCardNode] = useState(<div />);

  const createHabitCard = () => {
    setCardNode(<Card entriesInfo={[]} />);
  };

  const getCreateBtn = useCallback(() => {
    return (
      <div className='habit_card_btn'>
        <Button onClick={createHabitCard} type='primary' size='large'>
          建立“习惯记分卡”
        </Button>
      </div>
    );
  }, []);

  useEffect(() => {
    const cardsInfo = getCardsInfo();

    if (!cardsInfo || cardsInfo.length === 0) {
      const createBtn = getCreateBtn();

      setCardNode(createBtn);
      return;
    }

    setCardNode(<Card entriesInfo={cardsInfo} />);
  }, [getCreateBtn]);

  return <div className='habit_card'>{cardNode}</div>;
}

export default HabitCard;
