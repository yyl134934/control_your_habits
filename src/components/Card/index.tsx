import React, { useEffect, useState, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { initCard, addEntryService } from 'Src/services';
import { addEntry, createHabitCard } from 'Src/store/redux/entries.redux';
import { autoAddDefaultInfo, stringToEntry } from 'Src/utils';
import './index.less';
import Input from 'antd/lib/input/Input';
import Entry from '../Entry';

interface IProps {
  entriesInfo: Array<any>;
}

/**
 * 获得条目列表
 * @param entriesInfo
 * @returns
 */
function getEntries(infos: Array<any>) {
  const entries = infos.map((info) => {
    return <Entry entryInfo={info} /> || [];
  });

  console.info('获得条目列表getEntries:', entries);
  return entries;
}

/**
 * 记分卡
 * @param props 卡信息
 * @returns
 */
function Card(props: IProps) {
  const { entriesInfo } = props;
  const dispatch = useDispatch();

  // 习惯列表
  const [entries, setEntries] = useState<Array<any>>([]);

  // 按下回车键新增条目
  const handlePressEnter = (event: SyntheticEvent<HTMLInputElement>) => {
    const { currentTarget } = event;

    const lastEntry = entriesInfo[entriesInfo?.length - 1] || { habitWeight: 0 }; // 解构赋值，设置默认值
    const newEntryInfoArr = autoAddDefaultInfo(lastEntry.habitWeight, currentTarget?.value);
    const newEntry = stringToEntry(newEntryInfoArr);

    console.info('添加习惯条目:', newEntry);

    try {
      addEntryService(newEntry);
      dispatch(addEntry(newEntry));
      currentTarget.textContent = '';
    } catch (error) {
      console.error('添加习惯条目失败:', error);
    }
  };

  useEffect(() => {
    if (entriesInfo.length === 0) {
      const initInfo = initCard();
      dispatch(createHabitCard(initInfo));
    }

    setEntries(getEntries(entriesInfo));
  }, [entriesInfo, dispatch]);

  return (
    <div className='custom_card'>
      {[...entries]}
      <div className='card_input'>
        <Input placeholder='按“Enter”键添加' onPressEnter={handlePressEnter} />
      </div>
    </div>
  );
}

export default Card;
