import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { queryCardInfo } from 'Src/services';
import Card from 'Components/Card';
import { Button } from 'antd';
import './index.less';
import { useAppSelector } from 'Src/store/hooks';
import { setEntries } from 'Src/store/redux/entries.redux';
import { useDispatch } from 'react-redux';

function HabitCard() {
  const [cardNode, setCardNode] = useState(<div />);
  const dispatch = useDispatch();
  const initInfo = useAppSelector((state) => state.entriesState.entries);

  // 习惯卡
  const card = useMemo(
    () => (
      <>
        <div className='habit_card_title'>习惯记分卡（- 坏习惯 = 一般习惯 +好习惯）</div>
        <div className='habit_card_content'>
          <Card entriesInfo={initInfo} />
        </div>
      </>
    ),
    [initInfo],
  );

  // 创建按钮触发事件
  const createHabitCard = useCallback(() => {
    setCardNode(card);
  }, [card]);

  const createBtn = useMemo(
    () => (
      <div className='habit_card_btn'>
        <Button onClick={createHabitCard} type='primary' size='large'>
          建立“习惯记分卡”
        </Button>
      </div>
    ),
    [createHabitCard],
  );

  useEffect(() => {
    const currentInfo = queryCardInfo();

    if (currentInfo?.length !== 0) {
      dispatch(setEntries(currentInfo));
    }
  }, [dispatch]);

  useEffect(() => {
    const node = initInfo?.length === 0 ? createBtn : card;

    setCardNode(node);
  }, [card, createBtn, initInfo]);

  return <div className='habit_card'>{cardNode}</div>;
}

export default HabitCard;
