import React, { useEffect, useState, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { initCard, addEntryService } from 'Src/services';
import { addEntry } from 'Src/store/redux/entries.redux';
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
    const {
      currentTarget: { value },
    } = event;

    const lastEntry = entriesInfo[entriesInfo?.length - 1] || { habitWeight: 0 }; // 解构赋值，设置默认值
    const newEntryInfoArr = autoAddDefaultInfo(lastEntry.habitWeight, value);
    const newEntry = stringToEntry(newEntryInfoArr);

    console.info('添加习惯条目:', newEntry);

    try {
      addEntryService(newEntry);
      dispatch(addEntry(newEntry));
    } catch (error) {
      console.error('添加习惯条目失败:', error);
    }
  };

  useEffect(() => {
    const info = entriesInfo.length === 0 ? initCard() : entriesInfo;

    setEntries(getEntries(info));
  }, [entriesInfo]);

  return (
    <div className='custom_card'>
      <div className='card_entries'>
        {[...entries]}
        <Input onPressEnter={handlePressEnter} />
      </div>
    </div>
  );
}

export default Card;
